import { getProject, getProjects } from "@/lib/content";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Case study by Faraya Baig";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOg({ kicker: `Case study · ${p?.meta.company ?? ""}`, title: p?.meta.title ?? "Case study" });
}
