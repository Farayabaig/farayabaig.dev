import { getPost, getPosts } from "@/lib/content";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Post by Faraya Baig";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return renderOg({ kicker: "Writing", title: p?.meta.title ?? "Writing" });
}
