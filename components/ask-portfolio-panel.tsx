"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send, X } from "lucide-react";

type Source = { title: string; href: string; excerpt: string };
type Msg = { role: "user" | "assistant"; text: string; sources?: Source[]; error?: boolean; compact?: boolean };

const suggestions = ["What agents has Faraya built?", "Speech to text accuracy?", "AI security experience?"];

/** Renders the small Markdown subset the assistant uses (bold and "- " bullets) without HTML injection. */
function Rich({ text }: { text: string }) {
  const inline = (line: string) =>
    line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    );
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length)
      blocks.push(
        <ul key={blocks.length} className="my-1 list-disc space-y-1 pl-4 marker:text-accent">
          {bullets.map((b, i) => (
            <li key={i}>{inline(b)}</li>
          ))}
        </ul>,
      );
    bullets = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (/^[-*•]\s+/.test(line)) bullets.push(line.replace(/^[-*•]\s+/, ""));
    else {
      flush();
      if (line) blocks.push(<p key={blocks.length} className="my-1 first:mt-0">{inline(line)}</p>);
    }
  }
  flush();
  return <>{blocks}</>;
}

export function AskPortfolioPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi! Ask me anything about Faraya's work: agents, speech AI, fine tuning, AI security or availability. I answer only from this site's CV and case studies.",
    },
  ]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs]);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    // Last two exchanges (skipping the greeting) so follow up questions have context.
    const history = msgs
      .slice(1)
      .filter((m) => !m.error && m.text)
      .slice(-4)
      .map((m) => ({ role: m.role, text: m.text }));
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setQ("");
    setBusy(true);
    const update = (fn: (last: Msg) => Msg) =>
      setMsgs((m) => [...m.slice(0, -1), fn(m[m.length - 1])]);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      const type = res.headers.get("content-type") ?? "";
      if (!res.ok || !type.includes("ndjson") || !res.body) {
        // Errors, and the retrieval only fallback, come back as plain JSON.
        const data = await res.json();
        setMsgs((m) => [
          ...m,
          res.ok
            ? { role: "assistant", text: data.answer, sources: data.sources }
            : { role: "assistant", text: data.error ?? "Something went wrong.", error: true },
        ]);
        return;
      }
      setMsgs((m) => [...m, { role: "assistant", text: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const ev = JSON.parse(line) as { type: string; text?: string; message?: string; sources?: Source[] };
          if (ev.type === "sources") update((last) => ({ ...last, sources: ev.sources, compact: true }));
          else if (ev.type === "text") update((last) => ({ ...last, text: last.text + (ev.text ?? "") }));
          else if (ev.type === "error") update((last) => ({ ...last, text: ev.message ?? "Something went wrong.", error: true }));
        }
      }
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Network error. Please try again.", error: true }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="ask-title"
      className="fixed inset-x-2 bottom-2 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-[12px] border border-border bg-surface shadow-2xl shadow-black/30 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem]"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 id="ask-title" className="font-mono text-sm font-medium">
            Ask my portfolio
          </h2>
          <Link href="/projects/ask-my-portfolio" className="text-xs text-accent-strong hover:underline">
            How this works
          </Link>
        </div>
        <button type="button" onClick={onClose} className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:text-fg" aria-label="Close">
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-8 rounded-lg bg-bg px-3 py-2 text-fg" : "mr-4 text-fg"}>
            {m.text ? (
              m.error ? (
                <p className="text-amber">{m.text}</p>
              ) : m.role === "assistant" ? (
                <Rich text={m.text} />
              ) : (
                <p>{m.text}</p>
              )
            ) : m.role === "assistant" ? (
              <p className="font-mono text-xs text-muted">thinking…</p>
            ) : null}
            {m.sources?.length && m.compact && m.text ? (
              <p className="mt-2 text-xs text-muted">
                Sources:{" "}
                {m.sources.map((s, j) => (
                  <span key={j}>
                    <Link href={s.href} className="text-accent-strong hover:underline">
                      {s.title}
                    </Link>
                    {j < m.sources!.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            ) : m.sources?.length && !m.compact ? (
              <ul className="mt-2 space-y-2" aria-label="Sources">
                {m.sources.map((s, j) => (
                  <li key={j} className="rounded-lg border border-border p-2.5">
                    <Link href={s.href} className="text-xs font-medium text-accent-strong hover:underline">
                      {s.title}
                    </Link>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{s.excerpt}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
        {msgs.length === 1 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-accent hover:text-fg"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}
        {busy && msgs[msgs.length - 1]?.role === "user" ? <p className="font-mono text-[0.8125rem] text-muted">retrieving…</p> : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(q);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <input
          id="ask-input"
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={400}
          placeholder="Ask about agents, speech AI, security…"
          className="h-10 flex-1 rounded-lg border border-border bg-bg px-3 text-base text-fg placeholder:text-muted focus:border-accent focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          disabled={busy || !q.trim()}
          className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-strong text-accent-fg disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="size-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
