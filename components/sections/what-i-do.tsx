import Link from "next/link";
import { BrainCircuit, AudioLines, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { pillars } from "@/lib/site";
import { Section } from "@/components/ui/section";

const icons = { agentic: BrainCircuit, speech: AudioLines, finetune: SlidersHorizontal, security: ShieldCheck };

export function WhatIDo() {
  return (
    <Section id="what-i-do" eyebrow="What I do" title="Build agents, teach them language, tune them, then try to break them">
      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => {
          const Icon = icons[p.id];
          return (
            <article key={p.id} className="flex flex-col rounded-[12px] border border-border bg-surface p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-accent-strong">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{p.body}</p>
              <p className="mt-4 font-mono text-xs leading-relaxed text-muted">{p.tools.join(" · ")}</p>
              <Link href={p.proof} className="mt-auto pt-5 text-sm font-medium text-accent-strong hover:underline">
                See it in practice →
              </Link>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
