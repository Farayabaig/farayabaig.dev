import Link from "next/link";
import { about, arc, experience } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { Section } from "@/components/ui/section";

export function Experience() {
  const titles = Object.fromEntries(getProjects().map((p) => [p.slug, p.title]));
  return (
    <Section id="experience" eyebrow="About and experience" title="From automating decisions to shipping and securing agents">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        <div>
          <p className="text-[1.05rem] leading-relaxed text-fg/90">{about}</p>
          <ol className="mt-8 grid grid-cols-2 gap-2" aria-label="Career arc">
            {arc.map((a, i) => (
              <li key={a.where} className="rounded-[12px] border border-border bg-surface p-3">
                <span className="font-mono text-[0.7rem] text-accent-strong">{String(i + 1).padStart(2, "0")} · {a.where}</span>
                <span className="mt-1 block text-sm font-medium">{a.step}</span>
              </li>
            ))}
          </ol>
        </div>

        <ol className="relative border-l border-border">
          {experience.map((r) => (
            <li key={r.company} className="relative pb-10 pl-6 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-2 size-[9px] rounded-full border border-accent bg-bg"
              />
              <p className="font-mono text-xs text-muted">
                {r.start} to {r.end}
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                {r.title}, {r.company}
                {r.client ? <span className="font-normal text-muted"> · client {r.client}</span> : null}
              </h3>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-muted">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.65em] size-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              {r.projects.length ? (
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {r.projects.map((slug) => (
                    <Link key={slug} href={`/projects/${slug}`} className="text-accent-strong hover:underline">
                      {titles[slug] ?? slug} →
                    </Link>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
