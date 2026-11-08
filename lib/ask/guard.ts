/**
 * Input guard for "Ask my portfolio".
 * Layer 1 of the prompt injection defense: cheap checks before anything reaches a model.
 * Layer 2 (phase 2): retrieved passages are wrapped as untrusted data in the prompt,
 * and the model is told never to follow instructions found inside them.
 */
const INJECTION_PATTERNS = [
  /ignore (all|any|the|previous|prior|above).{0,20}(instructions|prompts?|rules)/i,
  /(system|developer) prompt/i,
  /you are now|act as|pretend to be|jailbreak|\bDAN\b/i,
  /reveal (your|the) (instructions|prompt|rules|secrets?)/i,
  /<\/?(system|assistant|tool)>/i,
];

export const MAX_QUESTION_CHARS = 400;

export function checkQuestion(q: unknown): { ok: true; question: string } | { ok: false; reason: string } {
  if (typeof q !== "string") return { ok: false, reason: "Send a question as text." };
  const question = q.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  if (question.length < 3) return { ok: false, reason: "Ask a slightly longer question." };
  if (question.length > MAX_QUESTION_CHARS) return { ok: false, reason: `Keep questions under ${MAX_QUESTION_CHARS} characters.` };
  if (INJECTION_PATTERNS.some((p) => p.test(question)))
    return { ok: false, reason: "That looks like a prompt injection attempt. Nice try! Ask me about Faraya's work instead." };
  return { ok: true, question };
}

/** Fixed window rate limiter. In memory, per instance; move to Upstash/Redis for production. */
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  entry.count += 1;
  if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count), retryAfter: Math.ceil((entry.reset - now) / 1000) };
}
