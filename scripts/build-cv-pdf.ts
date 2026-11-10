/**
 * Builds public/cv/Faraya_Baig_AI_Resume.pdf from lib/site.ts, so the PDF and the /cv page never drift.
 * Single column, real text (ATS friendly), A4. Run: npm run cv:pdf  (needs Playwright with Chromium)
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { cvSummary, education, experience, openSource, site, skills } from "../lib/site";

const require = createRequire(import.meta.url);
const font = (p: string) => "file://" + path.resolve("node_modules/@fontsource-variable", p);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const PHONE = "+966 50 562 1183";
const portfolio = site.url.replace(/^https?:\/\//, "");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Faraya Baig · AI Engineer · CV</title>
<style>
@font-face{font-family:Inter;src:url(${font("inter/files/inter-latin-wght-normal.woff2")}) format("woff2");font-weight:100 900}
@font-face{font-family:Grotesk;src:url(${font("space-grotesk/files/space-grotesk-latin-wght-normal.woff2")}) format("woff2");font-weight:300 700}
@page{size:A4;margin:15mm 16mm}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,Arial,sans-serif;font-size:9.6pt;line-height:1.42;color:#111827}
a{color:inherit;text-decoration:none}
h1{font-family:Grotesk,Inter,sans-serif;font-size:22pt;letter-spacing:-.02em;line-height:1.1}
.role{font-size:10.5pt;color:#0f766e;font-weight:600;margin-top:2pt}
.contact{margin-top:5pt;color:#374151;font-size:9pt}
.contact span+span:before{content:" · ";color:#9ca3af}
h2{font-family:Grotesk,Inter,sans-serif;font-size:10.5pt;text-transform:uppercase;letter-spacing:.06em;color:#0f766e;border-bottom:1px solid #d1d5db;padding-bottom:2pt;margin:12pt 0 6pt}
.job{margin-bottom:8pt;break-inside:avoid}
.job-head{display:flex;justify-content:space-between;gap:8pt}
.job-head b{font-size:10pt}
.dates{color:#4b5563;white-space:nowrap}
.client{color:#4b5563}
ul{padding-left:12pt;margin-top:2pt}
li{margin-bottom:1.6pt}
.os li{list-style:none;margin-left:-12pt}
.os b{font-weight:600}
.skills div{margin-bottom:2pt}
.skills b{font-weight:600}
</style></head><body>
<header>
<h1>${site.name}</h1>
<div class="role">AI Engineer · Agentic AI · Conversational and Speech AI · LLM Fine Tuning · AI Security</div>
<div class="contact"><span>${site.location} · open to relocation worldwide</span><span><a href="mailto:${site.email}">${site.email}</a></span><span>${PHONE}</span></div>
<div class="contact"><span><a href="${site.linkedin}">linkedin.com/in/farayabaig05</a></span><span><a href="${site.github}">github.com/Farayabaig</a></span><span><a href="${site.url}">${portfolio}</a></span></div>
</header>
<h2>Summary</h2><p>${esc(cvSummary)}</p>
<h2>Experience</h2>
${experience.map((r) => `<div class="job"><div class="job-head"><b>${r.title}, ${r.company}${r.client ? ` <span class="client">· client ${r.client}</span>` : ""}</b><span class="dates">${r.start} to ${r.end}</span></div>
<ul>${r.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>`).join("")}
<h2>Open source</h2>
<ul class="os">${openSource.map((o) => `<li><a href="${o.href}"><b>${o.name}</b></a>: ${esc(o.text)}</li>`).join("")}</ul>
<h2>Skills</h2>
<div class="skills">${skills.map((g) => `<div><b>${g.category}:</b> ${g.skills.map((s) => esc(s.name)).join(", ")}</div>`).join("")}</div>
<h2>Education</h2>
<div class="job-head"><span><b>${education.degree}</b>, ${education.school}</span><span class="dates">${education.start} to ${education.end}</span></div>
</body></html>`;

const out = path.resolve("public/cv/Faraya_Baig_AI_Resume.pdf");
const tmp = path.resolve(".cv-build.html");
fs.writeFileSync(tmp, html);
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + tmp, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: false });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log("wrote", out, Math.round(fs.statSync(out).size / 1024) + " KB");
})();
