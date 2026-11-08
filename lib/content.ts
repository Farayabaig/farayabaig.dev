import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");

export type ProjectMeta = {
  slug: string;
  title: string;
  company: string;
  summary: string;
  problem: string;
  solution: string;
  metrics: { value: string; label: string }[];
  role: string;
  timeline: string;
  tags: string[];
  featured?: boolean;
  order: number;
  nda?: boolean;
  links?: { label: string; href: string }[];
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

function readDir(dir: string) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

export function getProjects(): ProjectMeta[] {
  return readDir("projects")
    .map(({ slug, data }) => ({ ...(data as Omit<ProjectMeta, "slug">), slug }))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  const entry = readDir("projects").find((p) => p.slug === slug);
  if (!entry) return null;
  return { meta: { ...(entry.data as Omit<ProjectMeta, "slug">), slug }, content: entry.content };
}

function minutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function getPosts(): PostMeta[] {
  return readDir("blog")
    .map(({ slug, data, content }) => ({
      ...(data as Omit<PostMeta, "slug" | "readingMinutes">),
      slug,
      readingMinutes: minutes(content),
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string) {
  const entry = readDir("blog").find((p) => p.slug === slug);
  if (!entry) return null;
  return {
    meta: {
      ...(entry.data as Omit<PostMeta, "slug" | "readingMinutes">),
      slug,
      readingMinutes: minutes(entry.content),
    },
    content: entry.content,
  };
}

/** Plain text corpus for the "Ask my portfolio" retriever (phase 2). */
export function getCorpus() {
  const tag = (kind: "projects" | "blog") => readDir(kind).map((e) => ({ ...e, kind }));
  return [...tag("projects"), ...tag("blog")].map((e) => ({
    id: e.slug,
    kind: e.kind,
    title: String(e.data.title ?? e.slug),
    text: `${e.data.summary ?? e.data.description ?? ""}\n${e.content}`.replace(/<[^>]+>/g, " "),
  }));
}
