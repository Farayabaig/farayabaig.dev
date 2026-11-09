import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getPosts } from "@/lib/content";
import { MDX } from "@/components/mdx";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.meta.title,
    description: p.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: p.meta.title, description: p.meta.description, publishedTime: p.meta.date, url: `${site.url}/blog/${slug}` },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/blog/${slug}`,
  };
  return (
    <article className="container-content py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" aria-hidden /> All writing
      </Link>
      <header className="mt-6 max-w-3xl">
        <p className="font-mono text-[0.8125rem] text-muted">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {meta.readingMinutes} min read · {site.name}
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl">{meta.title}</h1>
        <p className="mt-4 text-lg text-muted">{meta.description}</p>
      </header>
      <div className="mt-10 max-w-3xl">
        <MDX source={content} />
      </div>
    </article>
  );
}
