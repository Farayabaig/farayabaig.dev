import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Writing",
  description: "Posts on agentic AI, AI security, speech AI and NLP by Faraya Baig.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <div className="container-content py-12 md:py-16">
      <p className="eyebrow">Writing</p>
      <h1 className="mt-3 text-3xl md:text-5xl">Agentic AI, AI security, speech and NLP</h1>
      <p className="mt-4 max-w-2xl text-muted">Practical notes from building agents and trying to break them.</p>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block py-6">
              <p className="font-mono text-xs text-muted">
                <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min read
              </p>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-accent-strong md:text-2xl">{p.title}</h2>
              <p className="mt-2 max-w-2xl text-muted">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
