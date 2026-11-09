import type { Metadata } from "next";
import { Download } from "lucide-react";
import { certifications, education, experience, site, skills } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { MarketCV } from "@/components/market-cv";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CV",
  description: "Faraya Baig's CV: AI Engineer with 4+ years in agentic AI, conversational and speech AI, LLM fine tuning and AI security.",
  alternates: { canonical: "/cv" },
};

export default function CVPage() {
  const titles = Object.fromEntries(getProjects().map((p) => [p.slug, p.title]));
  return (
    <div className="container-content py-12 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Curriculum vitae</p>
          <h1 className="mt-3 text-3xl md:text-5xl">{site.name}</h1>
          <p className="mt-3 text-lg text-muted">AI Engineer · Agentic AI · Conversational and Speech AI · AI Security</p>
          <p className="mt-2 text-sm text-muted">
            {site.location} ·{" "}
            <a href={`mailto:${site.email}`} className="text-accent-strong hover:underline">
              {site.email}
            </a>{" "}
            ·{" "}
            <a href={site.linkedin} className="text-accent-strong hover:underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href={site.github} className="text-accent-strong hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={site.cvPath} download>
            <Download aria-hidden /> Download PDF
          </a>
        </Button>
      </div>

      <div className="mt-10">
        <MarketCV titles={titles} />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <section aria-labelledby="cv-exp">
          <h2 id="cv-exp" className="text-2xl">
            Experience
          </h2>
          <ol className="mt-6 space-y-10">
            {experience.map((r) => (
              <li key={r.company}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {r.title}, {r.company}
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {r.start} to {r.end}
                  </p>
                </div>
                {r.client ? <p className="text-sm text-muted">Client: {r.client}</p> : null}
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] text-fg/90 marker:text-accent">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 text-2xl">Other projects</h2>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.95rem] text-fg/90 marker:text-accent">
            <li>Natural language to DB query assistant: CrewAI agents translating questions into SQL on PostgreSQL, returning structured JSON.</li>
            <li>Customer feedback portal with sentiment analysis: web app with a Twitter-roBERTa-base sentiment chatbot.</li>
          </ul>
        </section>

        <aside className="space-y-10">
          <section aria-labelledby="cv-edu">
            <h2 id="cv-edu" className="text-xl">
              Education
            </h2>
            <p className="mt-3 font-medium">{education.degree}</p>
            <p className="text-sm text-muted">{education.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {education.start} to {education.end}
            </p>
          </section>
          {certifications.length ? (
            <section aria-labelledby="cv-certs">
              <h2 id="cv-certs" className="text-xl">
                Certifications
              </h2>
              <ul className="mt-3 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p className="font-medium">{c.url ? <a href={c.url} className="hover:underline">{c.name}</a> : c.name}</p>
                    <p className="text-sm text-muted">
                      {c.issuer} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section aria-labelledby="cv-skills">
            <h2 id="cv-skills" className="text-xl">
              Skills
            </h2>
            <dl className="mt-3 space-y-4">
              {skills.map((g) => (
                <div key={g.category}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">{g.category}</dt>
                  <dd className="mt-1 text-sm text-fg/90">{g.skills.map((s) => s.name).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
