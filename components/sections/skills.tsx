import Link from "next/link";
import { skills } from "@/lib/site";
import { Section } from "@/components/ui/section";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I have shipped with"
      intro="Linked skills open the project where I used them. No progress bars, just evidence."
    >
      <div className="overflow-hidden rounded-[12px] border border-border">
        <dl className="divide-y divide-border">
          {skills.map((g) => (
            <div key={g.category} className="grid gap-2 bg-surface p-4 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:p-5">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1.5">{g.category}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s.name}>
                      {s.project ? (
                        <Link
                          href={`/projects/${s.project}`}
                          className="inline-flex items-center rounded-md border border-border bg-bg px-2.5 py-1 text-sm text-fg transition-colors hover:border-accent hover:text-accent-strong"
                        >
                          {s.name}
                          <span aria-hidden="true" className="ml-1 text-accent-strong">↗</span>
                        </Link>
                      ) : (
                        <span className="inline-flex items-center rounded-md border border-border px-2.5 py-1 text-sm text-muted">
                          {s.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
