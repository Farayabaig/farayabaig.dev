"use client";

import { useEffect, useState } from "react";
import { hero } from "@/lib/site";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const output: { k: string; v: string; tone?: "accent" | "amber" | "muted" }[] = [
  { k: "role", v: '"AI Engineer"' },
  { k: "focus", v: "[agents, speech, fine-tuning, security]" },
  { k: "experience", v: '"4+ years"', tone: "amber" },
  { k: "location", v: '"Riyadh, KSA"' },
  { k: "relocation", v: '"anywhere"' },
  { k: "status", v: "available ✓", tone: "accent" },
];

/** Decorative terminal: types the CLI command, then resolves into a profile. */
export function Terminal() {
  const reduced = usePrefersReducedMotion();
  const full = hero.command;
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (reduced) {
      setTyped(full.length);
      setLines(output.length + 1);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const type = () => {
      i += 1;
      setTyped(i);
      if (i < full.length) t = setTimeout(type, 28 + Math.random() * 30);
      else t = setTimeout(reveal, 350);
    };
    let n = 0;
    const reveal = () => {
      n += 1;
      setLines(n);
      if (n <= output.length) t = setTimeout(reveal, 140);
    };
    t = setTimeout(type, 450);
    return () => clearTimeout(t);
  }, [reduced, full.length]);

  const done = typed >= full.length;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[12px] border border-border bg-surface/90 font-mono text-[0.8rem] leading-6 shadow-[0_0_0_1px_rgb(0_0_0/0.02)] backdrop-blur-sm sm:text-[0.85rem]"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 text-[0.72rem] text-muted">faraya@riyadh: ~</span>
      </div>
      <div className="min-h-[15.5rem] px-4 py-4">
        <p className="break-words text-fg">
          <span className="text-accent-strong">{full.slice(0, Math.min(typed, 1))}</span>
          {full.slice(1, typed)}
          {!done ? <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent" /> : null}
        </p>
        {lines > 0 ? <p className="mt-2 text-muted">resolving profile… ok</p> : null}
        <div className="mt-1">
          {output.slice(0, Math.max(0, lines - 1)).map((o) => (
            <p key={o.k} className="break-words">
              <span className="whitespace-pre text-muted">{o.k.padEnd(11, " ")}</span>
              <span
                className={
                  o.tone === "accent" ? "text-accent-strong" : o.tone === "amber" ? "text-amber" : "text-fg"
                }
              >
                {o.v}
              </span>
            </p>
          ))}
        </div>
        {lines > output.length ? (
          <p className="mt-2 text-fg">
            <span className="text-accent-strong">$</span> <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-accent" />
          </p>
        ) : null}
      </div>
    </div>
  );
}
