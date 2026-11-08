import { GraduationCap, BadgeCheck } from "lucide-react";
import { certifications, education } from "@/lib/site";
import { Section } from "@/components/ui/section";

export function Credentials() {
  return (
    <Section id="education" eyebrow="Certifications and education" title="Foundations">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex gap-4 rounded-[12px] border border-border bg-surface p-6">
          <GraduationCap className="mt-1 size-5 shrink-0 text-accent-strong" aria-hidden />
          <div>
            <h3 className="text-lg font-semibold">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.school}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {education.start} to {education.end}
            </p>
          </div>
        </div>
        {certifications.map((c) => (
          <div key={c.name} className="flex gap-4 rounded-[12px] border border-border bg-surface p-6">
            <BadgeCheck className="mt-1 size-5 shrink-0 text-accent-strong" aria-hidden />
            <div>
              <h3 className="text-lg font-semibold">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <p className="mt-1 text-muted">{c.issuer}</p>
              <p className="mt-2 font-mono text-xs text-muted">{c.year}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
