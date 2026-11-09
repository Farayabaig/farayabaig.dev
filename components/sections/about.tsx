import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about, chapters, principles } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="From automating decisions to shipping and securing agents">
      <p className="max-w-3xl text-[1.05rem] leading-relaxed text-fg/90 md:text-lg">{about}</p>

      {/* Option 1: the career as four chapters, each a question I set out to answer */}
      <h3 className="mt-14 font-mono text-[0.8125rem] uppercase tracking-wider text-muted">How I got here</h3>
      <ol className="relative mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[7px] hidden h-px bg-border lg:block"
        />
        {chapters.map((c, i) => (
          <li key={c.period} className="relative flex flex-col">
            <span
              aria-hidden="true"
              className="relative hidden size-[15px] rounded-full border border-accent bg-bg lg:block"
            >
              <span className="absolute inset-[4px] rounded-full bg-accent" />
            </span>
            <div className="flex h-full flex-col rounded-[12px] border border-border bg-surface p-5 lg:mt-4">
              <p className="font-mono text-[0.8rem] text-accent-strong">
                {String(i + 1).padStart(2, "0")} · {c.period}
              </p>
              <p className="mt-1 font-mono text-[0.8rem] uppercase tracking-wider text-muted">{c.theme}</p>
              <h4 className="mt-3 text-lg font-semibold leading-snug">{c.question}</h4>
              <p className="mt-2 text-base md:text-[1.0625rem] text-muted">{c.built}</p>
              <div className="mt-auto pt-5">
                <p className="font-mono text-xl font-semibold text-amber">{c.metric.value}</p>
                <p className="text-sm text-muted">{c.metric.label}</p>
                <Link
                  href={`/projects/${c.project}`}
                  className="mt-4 inline-block text-[0.95rem] font-medium text-accent-strong hover:underline"
                >
                  See the project →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Option 2: principles, each backed by evidence */}
      <h3 className="mt-14 font-mono text-[0.8125rem] uppercase tracking-wider text-muted">How I work</h3>
      <ul className="mt-5 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border md:grid-cols-3">
        {principles.map((p, i) => (
          <li key={p.title} className="bg-bg p-5 md:p-6">
            <span className="font-mono text-[0.8125rem] text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-lg font-semibold leading-snug">{p.title}</p>
            <p className="mt-2 text-base md:text-[1.0625rem] text-muted">{p.evidence}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild variant="outline">
          <Link href="/cv">
            Full experience on my CV <ArrowRight aria-hidden />
          </Link>
        </Button>
        <span className="text-[0.95rem] text-muted">Roles, dates and every result, in one place.</span>
      </div>
    </Section>
  );
}
