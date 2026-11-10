import { getCorpus } from "@/lib/content";
import { about, chapters, cvSummary, experience, openSource, pillars, principles, site } from "@/lib/site";

type Chunk = { id: string; title: string; text: string; href: string };

let cache: Chunk[] | null = null;

/** Splits site content into paragraph sized chunks. Phase 2: swap for embeddings + pgvector. */
function chunks(): Chunk[] {
  if (cache) return cache;
  const out: Chunk[] = [
    { id: "about", title: "About", text: about, href: "/#about" },
    { id: "summary", title: "Profile summary", text: cvSummary, href: "/cv" },
    {
      id: "contact",
      title: "Contact and availability",
      text: `Faraya Baig is an AI Engineer based in ${site.location}, open to relocation worldwide with a preference for the EU and Canada, and open to visa sponsorship. Contact: email ${site.email}, LinkedIn ${site.linkedin}, GitHub ${site.github}. Recruiters can book a 20 minute call from the contact section of this site. The CV can be downloaded as a PDF from the CV page.`,
      href: "/#contact",
    },
  ];
  for (const c of chapters) out.push({ id: `chapter-${c.project}`, title: `${c.theme} (${c.period})`, text: `${c.question} ${c.built} Result: ${c.metric.value} ${c.metric.label}.`, href: `/projects/${c.project}` });
  for (const p of principles) out.push({ id: `principle-${p.title}`, title: `How Faraya works: ${p.title}`, text: p.evidence, href: "/#about" });
  for (const o of openSource) out.push({ id: `os-${o.name}`, title: `Open source: ${o.name}`, text: o.text, href: o.href });
  for (const r of experience) {
    out.push({
      id: `role-${r.company.toLowerCase()}`,
      title: `${r.title}, ${r.company} (${r.start} to ${r.end})`,
      text: r.highlights.join(" "),
      href: "/cv",
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

const STOP = new Set(
  "a an the and or of to in on for with is are was were be been what which who whom how does do did done you your her his she he they them their its it this that these those at by from as about any some can could would should has have had i me my we our tell show give list there here than then also just more most very work works worked working experience".split(" "),
);
// Name words match almost every chunk, so they carry no signal.
const NAMES = new Set(["faraya", "baig", "faraya's"]);

/** Tiny suffix stemmer: "agents" -> "agent", "securing" -> "secur", "built" stays. */
function stem(w: string) {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

const tokens = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9+.%']+/)
    .map((t) => t.replace(/^'+|'+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t) && !NAMES.has(t))
    .map(stem);

/** Small BM25 style lexical scorer. Good enough to ground answers until embeddings land. */
export function retrieve(query: string, k = 3) {
  const docs = chunks();
  const q = tokens(query);
  if (!q.length) return [];
  const N = docs.length;
  const df = new Map<string, number>();
  const toks = docs.map((d) => tokens(`${d.title} ${d.title} ${d.text}`));
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
    // At most two chunks per page, so answers draw on more than one source.
    .filter(
      (
        (seen) => (d: { title: string }) =>
          (seen[d.title] = (seen[d.title] ?? 0) + 1) <= 2
      )({} as Record<string, number>),
    )
    .slice(0, k);
}
