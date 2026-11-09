"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send, X } from "lucide-react";

type Source = { title: string; href: string; excerpt: string };
type Msg = { role: "user" | "assistant"; text: string; sources?: Source[]; error?: boolean };

const suggestions = ["What agents has Faraya built?", "Speech to text accuracy?", "AI security experience?"];

export function AskPortfolioPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi! I answer questions about Faraya's work using only this site's CV and case studies. This is an early preview: I return the most relevant passages for now.",
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
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setQ("");
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        res.ok
          ? { role: "assistant", text: data.answer, sources: data.sources }
          : { role: "assistant", text: data.error ?? "Something went wrong.", error: true },
      ]);
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
            Ask my portfolio <span className="ml-1 rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-muted">preview</span>
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
            <p className={m.error ? "text-amber" : undefined}>{m.text}</p>
            {m.sources?.length ? (
              <ul className="mt-2 space-y-2">
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
        {busy ? <p className="font-mono text-[0.8125rem] text-muted">retrieving…</p> : null}
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
