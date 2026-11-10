import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { checkQuestion, cleanHistory, rateLimit, underDailyCap } from "@/lib/ask/guard";
import { retrieve } from "@/lib/ask/retrieve";
import { hasModel, streamAnswer } from "@/lib/ask/generate";

export const runtime = "nodejs";
export const maxDuration = 30;

const FALLBACK =
  "I can't answer that right now. You can email Faraya at farayabaig05@gmail.com, or browse the case studies below.";

/**
 * POST /api/ask  { question: string, history?: {role, text}[] }
 *
 * 1. Input guard: length, rate limit, daily cap, obvious injection patterns.
 * 2. Retrieval: lexical BM25 over the site's own content (CV, case studies, posts).
 * 3. Generation: a small Claude model answers only from the retrieved passages, streamed back as
 *    newline delimited JSON: {"type":"sources"} first, then {"type":"text"} deltas, then {"type":"done"}.
 *    Without ANTHROPIC_API_KEY it falls back to returning the passages as JSON.
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const rl = rateLimit(ip);
  const daily = rateLimit(`day:${ip}`, Number(process.env.ASK_PER_IP_DAILY ?? 30), 86_400_000);
  if (rl.ok && !daily.ok) {
    return NextResponse.json({ error: "You've reached today's question limit. Email Faraya at farayabaig05@gmail.com for anything else." }, { status: 429 });
  }
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many questions. Try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } },
    );
  }

  let body: { question?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const check = checkQuestion(body?.question);
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
  const history = cleanHistory(body?.history);

  // Follow ups like "and what about security?" need the previous question to retrieve well.
  const lastUser = [...history].reverse().find((t) => t.role === "user")?.text ?? "";
  const passages = retrieve(`${check.question} ${lastUser}`, 5);
  const unique = passages.filter((p, i) => passages.findIndex((q) => q.title === p.title) === i);
  const sources = unique.slice(0, 3).map(({ title, text, href }) => ({
    title,
    href,
    excerpt: text.length > 220 ? `${text.slice(0, 217)}…` : text,
  }));

  if (!hasModel() || !underDailyCap()) {
    return NextResponse.json({
      phase: 1,
      answer: passages.length
        ? "Here are the most relevant passages from Faraya's work:"
        : "I couldn't find that in Faraya's CV or case studies. Try asking about agents, speech AI, fine tuning or AI security.",
      sources,
    });
  }

  const encoder = new TextEncoder();
  const send = (controller: ReadableStreamDefaultController, obj: unknown) =>
    controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));

  const body$ = new ReadableStream({
    async start(controller) {
      send(controller, { type: "sources", sources });
      try {
        const stream = streamAnswer(check.question, passages, history);
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            send(controller, { type: "text", text: event.delta.text });
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") send(controller, { type: "text", text: FALLBACK });
        console.log(
          `[ask] in=${final.usage.input_tokens} cache_read=${final.usage.cache_read_input_tokens ?? 0} out=${final.usage.output_tokens} stop=${final.stop_reason}`,
        );
        send(controller, { type: "done" });
      } catch (err) {
        // A coarse, non sensitive reason helps diagnose setup problems from the browser.
        let reason = "upstream";
        if (err instanceof Anthropic.RateLimitError) reason = "rate_limited";
        else if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) reason = "auth";
        else if (err instanceof Anthropic.NotFoundError) reason = "not_found";
        else if (err instanceof Anthropic.BadRequestError) reason = "bad_request";
        else if (err instanceof Anthropic.APIConnectionError) reason = "connection";
        if (err instanceof Anthropic.APIError) console.error(`[ask] API error ${err.status} (${reason}): ${err.message}`);
        else console.error("[ask] unexpected error", err);
        send(controller, { type: "error", message: FALLBACK, reason });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body$, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export function GET() {
  return NextResponse.json({ error: "Use POST with { question }." }, { status: 405 });
}
