import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { getProject, getProjects } from "@/lib/content";
import { MDX } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.meta.title,
    description: p.meta.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { type: "article", title: p.meta.title, description: p.meta.summary, url: `${site.url}/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { meta, content } = project;
  const all = getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article className="container-content py-12 md:py-16">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden /> All projects
      </Link>
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">{meta.company}</p>
        <h1 className="mt-3 text-3xl md:text-5xl">{meta.title}</h1>
        <p className="mt-4 text-lg text-muted">{meta.summary}</p>
      </header>

      {/* TL;DR card */}
      <section aria-label="TL;DR" className="mt-10 rounded-[12px] border border-border bg-surface">
        <div className="grid gap-px bg-border md:grid-cols-2">
          <div className="bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">Problem</p>
            <p className="mt-2 text-fg">{meta.problem}</p>
          </div>
          <div className="bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">Solution</p>
            <p className="mt-2 text-fg">{meta.solution}</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-3">
          {meta.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse bg-surface p-5">
              <dt className="mt-1 text-sm text-muted">{m.label}</dt>
              <dd className="font-mono text-2xl font-semibold text-amber">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-4 border-t border-border p-5 md:flex-row md:items-center md:justify-between">
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="inline text-muted">Role: </dt>
              <dd className="inline text-fg">{meta.role}</dd>
            </div>
            <div>
              <dt className="inline text-muted">Timeline: </dt>
              <dd className="inline text-fg">{meta.timeline}</dd>
            </div>
          </dl>
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
            {meta.tags.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-12 max-w-3xl">
        <MDX source={content} />

        {meta.nda || meta.links?.length ? (
          <section aria-labelledby="links-title" className="mt-12 border-t border-border pt-8">
            <h2 id="links-title" className="text-xl">
              Links
            </h2>
            {meta.links?.length ? (
              <ul className="mt-3 flex flex-wrap gap-3">
                {meta.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent-strong hover:underline">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {meta.nda ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <Lock className="size-4" aria-hidden /> Code is under NDA; architecture shared at a high level.
              </p>
            ) : null}
          </section>
        ) : null}
      </div>

      <nav aria-label="Next case study" className="mt-16">
        <Link
          href={`/projects/${next.slug}`}
          className="block rounded-[12px] border border-border bg-surface p-6 transition-colors hover:border-accent"
        >
          <span className="font-mono text-xs text-muted">Next case study</span>
          <span className="mt-1 block text-lg font-semibold">{next.title} →</span>
        </Link>
      </nav>
    </article>
  );
}
