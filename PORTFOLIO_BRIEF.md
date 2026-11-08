# AI/ML Engineer Portfolio Website: Design and Content Brief

Nov 8, 2026 · @Ali

## 1. Positioning: the one idea the site sells

Position Faraya Baig as **an AI Engineer who builds autonomous agents and conversational AI, and knows how to secure them**. In 4+ years you have gone from automating clinical decisions, to speech and NLP at scale, to multi agent systems, to red teaming those same agents. Very few engineers can show build and break on one page, and that is what makes you memorable.

**Headline options (pick one):**

1. Faraya Baig: AI Engineer building autonomous agents that are fast, useful and secure.
2. I build AI agents that do real work, and I make sure they can't be turned against you.
3. AI Engineer | Agentic AI, Conversational and Speech AI, LLM Security.

**Four pillars every page should reinforce:**

| Pillar | What it proves | Evidence from your resume |
| --- | --- | --- |
| Agentic AI and automation | You ship agents that replace manual work end to end | Autonomous QA agent qualifying NOVA builds across 29 hardware configurations and cloud bare metal, hours cut to minutes (Ebryx); Genie Mentor multi agent RAG platform (Emumba) |
| Conversational, Speech AI and NLP | You can take raw human language to production accuracy | Canary-1B and Whisper STT under 5% WER; intent, sentiment, emotion and summarization models at 95%+ accuracy; LangChain + Phi-3 support assistant demoed to Salesforce (Afiniti) |
| LLM fine tuning and evaluation | You go beyond prompting into model behavior | Fine tuned Qwen 2.5 3B and Mistral 7B for function calling; DSPy evaluation and prompt optimization workflow (Emumba) |
| AI security | You understand how agents fail and get attacked | Adversarial testing and threat modeling of LLMs, agentic frameworks and MCP systems for BlueRock.io; security scanning on every build (Ebryx) |

**Your narrative arc:** automate decisions (CureMD) → understand conversations (Afiniti) → orchestrate agents (Emumba) → ship and secure agents (Ebryx). Use this arc in the About section and the experience timeline.

## 2. Site structure

Build a single scrolling home page plus a dedicated page per case study and a blog. Recruiters spend under a minute on the home page, so the order below puts proof before biography.

**Home page, top to bottom:**

1. **Hero:** headline, one line subhead, two buttons (View Projects, Download CV), location line "Riyadh, KSA | Open to relocation anywhere".
2. **Proof strip:** four big numbers (years in tech, systems shipped, environments, the QA agent's hours to minutes result).
3. **Featured projects:** three large case study cards, each with a problem, a result metric and tech tags.
4. **What I do:** the four pillars as cards (Agentic AI, Conversational and Speech AI, LLM Fine Tuning and Evaluation, AI Security).
5. **Interactive architecture showcase:** an animated diagram of your agentic QA system that lights up as the visitor scrolls.
6. **Experience timeline:** vertical timeline, each role written as impact, not duties.
7. **Skills matrix:** grouped by category with proficiency shown through real project links, not progress bars.
8. **Writing and talks:** posts on agentic AI, speech AI and red teaming AI agents.
9. **Certifications and education.**
10. **Contact:** email, LinkedIn, GitHub, Calendly link, work authorization line.

**Other pages:**

- `/projects/[slug]`: full case studies (template in section 5).
- `/blog`: MDX posts on agentic AI, AI security, speech and NLP.
- `/cv`: web version of the resume with a PDF download, plus market specific versions (see section 6).
- `/uses` (optional): your dev setup, tools and models you use. Engineers love this page and it signals genuine hands on work.
- `/ar` (optional, strong for KSA): Arabic version of the home page with right to left layout.

## 3. Visual design direction

Go for **"engineering control room"**: dark, precise, calm, with one confident accent color. It should feel like a well built developer tool (think Linear, Vercel, Anthropic Console) rather than a flashy template. Enterprise recruiters in KSA, the EU and Canada trust restraint.

**Color palette:**

| Role | Dark mode | Light mode |
| --- | --- | --- |
| Background | #0B0F14 (near black, slight blue) | #FAFAF7 (warm off white) |
| Surface / cards | #121821 | #FFFFFF |
| Border | #1F2A37 | #E5E7EB |
| Primary text | #E6EDF3 | #0B0F14 |
| Muted text | #8B98A5 | #5B6470 |
| Accent (signature) | #2DD4BF (teal: AI, signal, trust) | #0D9488 |
| Secondary accent | #F5B942 (amber, used sparingly for metrics) | #B7791F |

Teal reads modern and technical, and pairs well with green tones familiar to the KSA market without looking themed.

**Typography:**

- Headings: **Space Grotesk** or **Inter Display** (bold, tight letter spacing).
- Body: **Inter**, 16 to 18px, line height 1.6.
- Code, tags and metrics: **JetBrains Mono**.
- Arabic version: **IBM Plex Sans Arabic**, which matches Inter well.

**Layout rules:**

- Max content width 1120px, generous whitespace, 8px spacing grid.
- Cards with 1px borders and 12px radius, no heavy shadows.
- A subtle dotted grid background in the hero, like an engineering canvas.

**Signature interactions (pick two or three, not all):**

1. **Terminal hero:** the headline types out like a CLI command (`$ faraya --role "AI Engineer" --focus agentic-systems`) then resolves into the real headline.
2. **Live agent trace:** a small panel in the hero that replays a fake but realistic agent run log (plan, tool call, observe, verify, pass), showing how you think about agents.
3. **Scroll animated architecture:** the autonomous QA agent diagram (Slack command, planner, test runners across 29 configs, retries, report) where each component highlights as you scroll through its explanation.
4. **"Ask my portfolio" chatbot:** a small RAG assistant trained on your CV and case studies. This is the strongest single proof of AI engineering skill on the site. Keep it cheap with a small model and strict rate limits.
5. **Metric counters** that count up when they enter the viewport.

**Avoid:** stock AI imagery (glowing brains, robots), skill progress bars, particle backgrounds, and more than one animation fighting for attention at once.

## 4. Content and draft copy, section by section

All copy below is built from your resume and written to be scanned in seconds.

**Hero**

> **I build AI agents that do real work, and keep them secure.** AI Engineer with 4+ years across agentic AI, conversational and speech AI, LLM fine tuning and AI security. Riyadh, KSA · Open to relocation anywhere \[View my work\] \[Download CV\]

**Proof strip (four metrics)**

| Metric | Value | Source |
| --- | --- | --- |
| Years building AI | 4+ | Resume |
| Hardware configurations my QA agent qualifies | 29 | Resume |
| Faster QA cycles | \~95% (hours to minutes) | Estimated from resume |
| Senior engineer support hours saved | 50%+ | Resume |

Alternates to rotate in: under 5% word error rate on call audio, 95%+ NLP model accuracy, \~50% faster data labeling, 10+ AI systems shipped (estimate). Keep any estimated number one you can explain in an interview.

**What I do (four cards)**

1. **Agentic AI and Automation:** autonomous and multi agent systems that plan, call tools, verify and retry. AutoGen, CrewAI, LangChain, Google ADK, OpenAI Agents SDK, MCP.
2. **Conversational and Speech AI:** speech to text, intent, sentiment, emotion and summarization models, and support assistants that hold up in production. Whisper, Canary-1B, Phi-3.
3. **LLM Fine Tuning and Evaluation:** fine tuning small models for function calling, plus evaluation driven prompt optimization with DSPy. Qwen, Mistral, LLaMA, vLLM.
4. **AI Security:** adversarial testing, red teaming and threat modeling for LLMs, agentic frameworks and MCP systems, with security checks built into every deployment.

**About, version A: start with automation (recommended)**

> My first AI system checked cancer treatment plans against NCCN guidelines. At CureMD I built a clinical decision support system on a knowledge graph that flagged deviations from clinical standards. That taught me what I still care about most: automating decisions people rely on. At Afiniti I moved into conversational AI, building speech to text pipelines under 5% word error rate and NLP models at 95%+ accuracy that replaced manual call review. At Emumba I built multi agent RAG systems and fine tuned LLMs for tool use. Today at Ebryx I build autonomous agents and red team them, so they are both useful and safe.

**About, version B: start with conversational AI**

> I got into AI through language: how people talk, and how machines can understand them. At Afiniti I built speech to text pipelines under 5% word error rate, and NLP models for intent, sentiment and summarization at 95%+ accuracy, turning raw call audio into analytics the business ran on. From understanding conversations I moved to acting on them: multi agent RAG platforms and fine tuned function calling models at Emumba, then autonomous QA agents and AI security work at Ebryx. My foundation is a clinical decision support system I built at CureMD.

Version A has the stronger arc (automation → language → agents → security). Version B is better if you are applying mostly to conversational AI or contact center roles.

**Experience timeline (impact format)**

- **AI Software Engineer, Ebryx** (Oct 2025 to present, client BlueRock.io): Built an autonomous QA agent that self qualifies NOVA microhypervisor builds across 29 hardware configurations and cloud bare metal, cutting multi hour supervised cycles to minutes. Shipped it as a Slack bot with natural language commands, budget guardrails and failure aware retries. Ran adversarial testing and threat modeling on LLMs, agentic frameworks and MCP systems, and added automated AI security scanning on every build.
- **AI Software Engineer, Emumba** (Mar 2025 to Sep 2025): Architected Genie Mentor, a multi agent RAG onboarding platform that cut senior engineer support hours by 50%+. Designed a planner, retriever, executor, evaluator and editor workflow over MCP tools for GitHub, Notion and Confluence. Fine tuned Qwen 2.5 3B and Mistral 7B for function calling and built a DSPy evaluation workflow.
- **AI Software Engineer, Afiniti** (Jul 2023 to Mar 2025): Built STT pipelines on Canary-1B and Whisper under 5% WER. Deployed intent, sentiment, emotion, summarization and offer detection models at 95%+ accuracy. Cut labeling time \~50% with Mistral and LLaMA-3. Built a LangChain + Phi-3 support assistant demoed to Salesforce, and a 96% accurate churn model.
- **R&D Fellow, CureMD** (Aug 2022 to Apr 2023): Built a clinical decision support system validating cancer treatment plans against NCCN guidelines through a machine readable knowledge graph.
- **BS Computer Science, FAST NUCES** (2019 to 2023).

**Skills matrix (grouped, each skill links to a project)**

| Category | Skills |
| --- | --- |
| Agentic frameworks | AutoGen, CrewAI, LangChain, Google ADK, OpenAI Agents SDK, MCP |
| AI / ML | NLP and NLU, LLMs, STT / TTS, multi agent systems, RAG, prompt engineering, fine tuning, tool calling, MLOps |
| AI security | AI infrastructure security, adversarial AI, red teaming, threat modeling |
| Frameworks | TensorFlow, PyTorch, vLLM, Transformers, DSPy, FastAPI, scikit learn |
| Data | Pinecone, Qdrant, ChromaDB, PostgreSQL, MySQL, NumPy, Pandas |
| Languages | Python, C++, OOP and design patterns |
| Cloud and DevOps | AWS, Docker, Git, REST APIs |

**Contact**

> Let's build agents that actually ship. farayabaig05@gmail.com · linkedin.com/in/farayabaig05 · github.com/Farayabaig · Book a 20 minute call Based in Riyadh, KSA. Open to relocation anywhere and comfortable working across time zones.

## 5. Project case studies

Show six to eight projects, three featured on the home page. Every case study page follows the same template so recruiters learn where to look.

**Case study template:**

1. **TL;DR card:** one sentence problem, one sentence solution, two or three result metrics, role, timeline, tech tags.
2. **The problem:** why it mattered to the business.
3. **Architecture:** a clean diagram (Mermaid or custom SVG) plus a short walk through.
4. **Key engineering decisions:** three trade offs you made and why. Senior hiring managers read this part closely.
5. **Results:** numbers, before and after.
6. **What I would do next:** shows maturity.
7. **Links:** GitHub, demo video, write up. For client work add: "Code is under NDA; architecture shared at a high level."

**Suggested projects:**

| # | Project | Angle to highlight | Placement |
| --- | --- | --- | --- |
| 1 | **Autonomous QA Agent for NOVA microhypervisor** (Ebryx, for BlueRock.io) | Flagship. Self qualifies builds across 29 hardware configurations and cloud bare metal; Slack bot with natural language commands; budget guardrails and failure aware retries; hours to minutes | Featured |
| 2 | **Genie Mentor: multi agent RAG onboarding platform** (Emumba) | Planner, retriever, executor, evaluator and editor agents over MCP to GitHub, Notion and Confluence; 3 silos into 1 query path; 50%+ fewer senior support hours | Featured |
| 3 | **Call intelligence: speech to insight pipeline** (Afiniti) | Canary-1B and Whisper STT under 5% WER feeding intent, sentiment, emotion, summarization and offer detection at 95%+ accuracy; replaced manual call review | Featured |
| 4 | **Red teaming agentic and MCP systems** (Ebryx) | Threat modeling and adversarial tests on LLMs, agent frameworks and MCP; security scanning on every build. Describe attack classes found, never client specifics | Supporting |
| 5 | **Fine tuning small LLMs for function calling** (Emumba) | Qwen 2.5 3B and Mistral 7B vs off the shelf models on structured tool calls; DSPy evaluation loop. Great place for a results chart | Supporting |
| 6 | **Clinical decision support on a knowledge graph** (CureMD) | Validates cancer treatment plans against NCCN guidelines and flags deviations; reusable clinical knowledge base | Supporting |
| 7 | **Natural language to SQL assistant** (personal) | CrewAI agents turning questions into SQL on PostgreSQL with structured JSON results. Public code, easy live demo | Supporting, with live demo |
| 8 | **Customer feedback portal with sentiment analysis** (personal) | Web app with a Twitter-roBERTa sentiment chatbot | Archive or GitHub only |
| 9 | **"Ask my portfolio" RAG assistant** (build new) | The chatbot on the site itself, grounded on your CV and case studies, with an eval page. Add a small prompt injection defense and explain it, which ties to your security pillar | Supporting |

**Smaller extras worth one line each:** LLM driven data labeling with Mistral and LLaMA-3 (\~50% faster), LangChain + Phi-3 support assistant demoed to Salesforce, 96% accurate telecom churn model.

**Tip:** projects 7 and 9 are public, so give them clean GitHub repos with READMEs, tests and a short demo video. They give recruiters something to click while your client work stays under NDA.

## 6. Tailoring for KSA, EU and Canada

One site, one story, with small switches per market. The simplest approach is a toggle on the `/cv` page ("Viewing as: KSA | EU | Canada") that swaps the CV PDF and a few emphasis lines.

|  | KSA | EU | Canada |
| --- | --- | --- | --- |
| What they value most | Agentic AI and automation for Vision 2030 projects, AI security, Arabic language AI, enterprise delivery | Engineering depth, open source, model fine tuning, responsible AI, EU AI Act and GDPR awareness | Practical impact, teamwork, clear communication |
| Lead with | Autonomous QA agent + AI security | Fine tuning and evaluation work, GitHub, technical blog | Genie Mentor and call intelligence results |
| Language | Arabic version of the home page is a strong plus; mention Arabic NLP interest if true | English; list languages spoken | English (French is a plus in Quebec) |
| CV format | Photo acceptable, 2 pages fine | No photo for most countries, 2 pages | No photo, no age or marital status, 2 pages, achievement focused |
| Location line | "Based in Riyadh, available immediately" | "Based in Riyadh, open to relocation anywhere" | "Based in Riyadh, open to relocation anywhere" |
| Blog post to add | Securing AI agents in enterprise deployments | Red teaming MCP based agents | What fine tuning a 3B model for tool calling taught me |

**Keywords to weave into headings and project text (helps SEO and recruiter search):** AI Engineer, Machine Learning Engineer, LLM Engineer, Agentic AI, Multi Agent Systems, RAG, Conversational AI, Speech AI, NLP, Generative AI, AI Security, Red Teaming, MCP, Python, AWS.

**Time zone line:** add "Comfortable working across time zones from Riyadh to Toronto" in the contact section. It removes a silent objection for remote EU and Canadian roles.

## 7. Tech stack, SEO and performance

The site itself is a portfolio piece, so build it the way a strong engineer would.

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui, dark mode default with a light toggle |
| Animation | Framer Motion (scroll reveals, counters), kept subtle |
| Content | MDX for case studies and blog posts, in the repo |
| Diagrams | Mermaid or hand built SVG components |
| Chatbot | FastAPI or Next.js route + embeddings of CV and case studies, pgvector or a small hosted vector DB, rate limited, with a visible "how this works" link |
| i18n | next-intl for English and Arabic, with RTL support |
| Hosting | Vercel, custom domain such as farayabaig.dev |
| Analytics | Plausible or Vercel Analytics (privacy friendly, GDPR safe, no cookie banner needed) |

**SEO:**

- Page title: "Faraya Baig | AI Engineer, Agentic AI, LLMs and AI Security".
- Open Graph image generated per page (name, title, project name).
- JSON-LD `Person` schema with jobTitle, sameAs (LinkedIn, GitHub), knowsAbout.
- `sitemap.xml`, `robots.txt`, canonical URLs.

**Quality bar:**

- Lighthouse 95+ on all four scores.
- Fully responsive; most recruiters first open links on a phone.
- Accessible: semantic HTML, keyboard navigation, contrast AA, `prefers-reduced-motion` respected.
- CV PDF under 300 KB and ATS friendly (single column text layer).

## 8. Prompt to give Claude Code

Export this doc as Markdown, save it as `PORTFOLIO_BRIEF.md` in an empty folder with `Faraya_Baig_AI_Resume.pdf`, then paste the prompt below.

```markdown
You are building my personal portfolio website. I am Faraya Baig, an AI
Engineer with 4+ years of experience, based in Riyadh, KSA, open to
relocation anywhere.

Inputs in this folder:
1. PORTFOLIO_BRIEF.md: the full design and content brief. Follow it closely.
2. Faraya_Baig_AI_Resume.pdf: my resume. Use it as the source of truth for
   titles, dates, companies, metrics and skills. Metrics marked "estimated"
   in the brief are approved to use as written.

Goals:
1. Position me as an AI Engineer who builds autonomous agents and
   conversational AI, and knows how to secure them.
2. Attract recruiters in KSA, the EU and Canada.

Build:
1. Next.js 15 + TypeScript + Tailwind + shadcn/ui + Framer Motion, MDX content.
2. Home page sections in the exact order from section 2 of the brief.
3. Design system from section 3: colors, fonts, layout rules. Dark mode default.
4. Signature interactions: terminal hero, scroll animated architecture
   diagram of the autonomous QA agent, metric counters.
5. Case study pages using the template in section 5, one MDX file per project.
6. About section using version A from section 4.
7. /cv page with KSA, EU and Canada toggle (section 6).
8. /blog with MDX and one seed post: "Red teaming MCP based agents".
9. SEO, accessibility and performance from section 7. Target Lighthouse 95+.
10. Leave the "Ask my portfolio" RAG chatbot as phase 2, but scaffold the
    API route and UI.

Work in stages: first show me the project structure and design tokens,
then build section by section, running the dev server and checking each
section on mobile and desktop widths before moving on.
```

**Before launch checklist:**

- [ ] Choose the About version (A or B) and the headline
- [ ] Check every estimated metric is one you can explain in an interview
- [ ] Confirm with Ebryx what you can say publicly about the BlueRock.io work
- [ ] Clean public repos for the NL to SQL assistant and the portfolio chatbot
- [ ] Professional photo (KSA and LinkedIn) and photo free CV versions (EU, Canada)
- [ ] Custom domain connected
- [ ] LinkedIn headline matches the site headline
