import Link from "next/link";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const upcoming = [
  "Securing AI agents in enterprise deployments",
  "What fine tuning a 3B model for tool calling taught me",
];

export function Writing() {
  const posts = getPosts().slice(0, 3);
  return (
    <Section id="writing" eyebrow="Writing" title="Notes on agentic AI, speech AI and red teaming agents">
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        {posts.map((p) => (
          <article key={p.slug} className="group relative rounded-[12px] border border-border bg-surface p-6 transition-colors hover:border-accent">
            <p className="font-mono text-[0.8125rem] text-muted">
              <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min read
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                {p.title}
              </Link>
            </h3>
            <p className="mt-2 text-base md:text-[1.0625rem] text-muted">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <div className="rounded-[12px] border border-dashed border-border p-6">
          <p className="font-mono text-[0.8125rem] text-muted">In the works</p>
          <ul className="mt-3 space-y-3">
            {upcoming.map((u) => (
              <li key={u} className="text-base md:text-[1.0625rem] text-muted">
                {u}
              </li>
            ))}
          </ul>
          <Link href="/blog" className="mt-5 inline-block text-[0.95rem] font-medium text-accent-strong hover:underline">
            All writing →
          </Link>
        </div>
      </div>
    </Section>
  );
}
