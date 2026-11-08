import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectMeta } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, large = false }: { project: ProjectMeta; large?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[12px] border border-border bg-surface p-6 transition-colors hover:border-accent",
        large && "md:p-7",
      )}
    >
      <p className="font-mono text-xs text-muted">{project.company}</p>
      <h3 className={cn("mt-2 font-semibold", large ? "text-xl md:text-[1.4rem]" : "text-lg")}>
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-[12px]">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.95rem] text-muted">
        <span className="font-medium text-fg">Problem: </span>
        {project.problem}
      </p>
      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-amber">{project.metrics[0]?.value}</span>
        <span className="text-sm text-muted">{project.metrics[0]?.label}</span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech">
        {project.tags.slice(0, large ? 5 : 4).map((t) => (
          <li key={t}>
            <Badge>{t}</Badge>
          </li>
        ))}
      </ul>
      <span className="mt-auto flex items-center gap-1 pt-6 text-sm font-medium text-accent-strong">
        Read case study
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </article>
  );
}
