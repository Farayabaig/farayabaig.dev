import { getCorpus } from "@/lib/content";
import { about, experience, pillars } from "@/lib/site";

type Chunk = { id: string; title: string; text: string; href: string };

let cache: Chunk[] | null = null;

/** Splits site content into paragraph sized chunks. Phase 2: swap for embeddings + pgvector. */
function chunks(): Chunk[] {
  if (cache) return cache;
  const out: Chunk[] = [{ id: "about", title: "About", text: about, href: "/#experience" }];
  for (const r of experience) {
    out.push({
      id: `role-${r.company.toLowerCase()}`,
      title: `${r.title}, ${r.company} (${r.start} to ${r.end})`,
      text: r.highlights.join(" "),
      href: "/#experience",
    });
  }
  for (const p of pillars) out.push({ id: `pillar-${p.id}`, title: p.title, text: `${p.body} ${p.tools.join(", ")}`, href: "/#what-i-do" });
  for (const doc of getCorpus()) {
    const href = `/${doc.kind}/${doc.id}`;
    doc.text
      .split(/\n(?=## )/)
      .map((s) => s.replace(/[#*`>{}[\]]/g, " ").replace(/\s+/g, " ").trim())
      .filter((s) => s.length > 40)
      .forEach((text, i) => out.push({ id: `${doc.id}-${i}`, title: doc.title, text, href }));
  }
  cache = out;
  return out;
}

const STOP = new Set("a an the and or of to in on for with is are was were what which who how does do did you your her his their at by from as it this that".split(" "));
const tokens = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9+.%]+/)
    .filter((t) => t.length > 1 && !STOP.has(t));

/** Small BM25 style lexical scorer. Good enough to ground answers until embeddings land. */
export function retrieve(query: string, k = 3) {
  const docs = chunks();
  const q = tokens(query);
  if (!q.length) return [];
  const N = docs.length;
  const df = new Map<string, number>();
  const toks = docs.map((d) => tokens(`${d.title} ${d.text}`));
  toks.forEach((t) => new Set(t).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));
  const avg = toks.reduce((a, t) => a + t.length, 0) / N;
  return docs
    .map((d, i) => {
      const tf = new Map<string, number>();
      toks[i].forEach((w) => tf.set(w, (tf.get(w) ?? 0) + 1));
      let score = 0;
      for (const w of q) {
        const f = tf.get(w) ?? 0;
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(w) ?? 0) + 0.5) / ((df.get(w) ?? 0) + 0.5));
        score += idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (toks[i].length / avg))));
      }
      return { ...d, score };
    })
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
