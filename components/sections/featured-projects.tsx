import Link from "next/link";
import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/ui/section";

export function FeaturedProjects() {
  const all = getProjects();
  const featured = all.filter((p) => p.featured);
  const more = all.filter((p) => !p.featured);
  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Agents, speech pipelines and RAG systems running in production"
      intro="Three systems that show the range: an autonomous QA agent, a multi agent RAG platform and a speech to insight pipeline."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} large />
        ))}
      </div>
      <div className="mt-10">
        <h3 className="text-base font-medium text-muted">More case studies</h3>
        <ul className="mt-3 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
          {more.map((p) => (
            <li key={p.slug} className="bg-surface">
              <Link
                href={`/projects/${p.slug}`}
                className="flex h-full flex-col gap-1 p-4 transition-colors hover:bg-bg"
              >
                <span className="font-medium text-fg">{p.title}</span>
                <span className="text-[0.95rem] text-muted">{p.context}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
