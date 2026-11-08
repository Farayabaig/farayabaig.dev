/**
 * Single source of truth for site copy and resume data.
 * Facts come from Faraya_Baig_AI_Resume.pdf; estimated metrics are the ones
 * approved in PORTFOLIO_BRIEF.md and are flagged with `estimated: true`.
 */

export const site = {
  name: "Faraya Baig",
  title: "Faraya Baig | AI Engineer, Agentic AI, LLMs and AI Security",
  description:
    "AI Engineer with 4+ years building autonomous agents, conversational and speech AI, fine tuned LLMs and AI security. Based in Riyadh, KSA, open to relocation anywhere.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://farayabaig.dev",
  email: "farayabaig05@gmail.com",
  linkedin: "https://www.linkedin.com/in/farayabaig05/",
  github: "https://github.com/Farayabaig",
  /** Set NEXT_PUBLIC_CALENDLY_URL to your real booking link. Falls back to email. */
  booking:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "mailto:farayabaig05@gmail.com?subject=20%20minute%20call&body=Hi%20Faraya%2C%20I%27d%20like%20to%20book%20a%2020%20minute%20call.",
  location: "Riyadh, KSA",
  locationLine: "Riyadh, KSA · Open to relocation anywhere",
  cvPath: "/cv/Faraya_Baig_AI_Resume.pdf",
  /** Review before launch: confirm this matches your actual status. */
  workAuthorization: "Work authorization: based in KSA; open to relocation and visa sponsorship for roles in the EU and Canada.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Engineer",
    "Agentic AI",
    "Multi Agent Systems",
    "RAG",
    "Conversational AI",
    "Speech AI",
    "NLP",
    "Generative AI",
    "AI Security",
    "Red Teaming",
    "MCP",
    "Python",
    "AWS",
  ],
};

export const nav = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
  { href: "/cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export const hero = {
  command: '$ faraya --role "AI Engineer" --focus agentic-systems',
  headline: "I build AI agents that do real work, and keep them secure.",
  subhead:
    "AI Engineer with 4+ years across agentic AI, conversational and speech AI, LLM fine tuning and AI security.",
};

export type Metric = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  estimated?: boolean;
};

export const proofMetrics: Metric[] = [
  { value: 4, suffix: "+", label: "Years building AI systems" },
  { value: 29, suffix: "", label: "Hardware configurations my QA agent qualifies" },
  { value: 95, prefix: "~", suffix: "%", label: "Faster QA cycles, hours to minutes", estimated: true },
  { value: 50, suffix: "%+", label: "Senior engineer support hours saved" },
];

export const pillars = [
  {
    id: "agentic",
    title: "Agentic AI and Automation",
    body: "Autonomous and multi agent systems that plan, call tools, verify and retry.",
    tools: ["AutoGen", "CrewAI", "LangChain", "Google ADK", "OpenAI Agents SDK", "MCP"],
    proof: "/projects/autonomous-qa-agent",
  },
  {
    id: "speech",
    title: "Conversational and Speech AI",
    body: "Speech to text, intent, sentiment, emotion and summarization models, and support assistants that hold up in production.",
    tools: ["Whisper", "Canary-1B", "Phi-3", "LangChain"],
    proof: "/projects/call-intelligence",
  },
  {
    id: "finetune",
    title: "LLM Fine Tuning and Evaluation",
    body: "Fine tuning small models for function calling, plus evaluation driven prompt optimization with DSPy.",
    tools: ["Qwen", "Mistral", "LLaMA", "vLLM", "DSPy"],
    proof: "/projects/fine-tuning-function-calling",
  },
  {
    id: "security",
    title: "AI Security",
    body: "Adversarial testing, red teaming and threat modeling for LLMs, agentic frameworks and MCP systems, with security checks built into every deployment.",
    tools: ["Threat modeling", "Red teaming", "MCP", "CI scanning"],
    proof: "/projects/red-teaming-agentic-systems",
  },
] as const;

export const about =
  "My first AI system checked cancer treatment plans against NCCN guidelines. At CureMD I built a clinical decision support system on a knowledge graph that flagged deviations from clinical standards. That taught me what I still care about most: automating decisions people rely on. At Afiniti I moved into conversational AI, building speech to text pipelines under 5% word error rate and NLP models at 95%+ accuracy that replaced manual call review. At Emumba I built multi agent RAG systems and fine tuned LLMs for tool use. Today at Ebryx I build autonomous agents and red team them, so they are both useful and safe.";

export const arc = [
  { step: "Automate decisions", where: "CureMD" },
  { step: "Understand conversations", where: "Afiniti" },
  { step: "Orchestrate agents", where: "Emumba" },
  { step: "Ship and secure agents", where: "Ebryx" },
];

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  client?: string;
  summary: string;
  highlights: string[];
  projects: string[];
};

export const experience: Role[] = [
  {
    company: "Ebryx",
    title: "AI Software Engineer",
    start: "Oct 2025",
    end: "Present",
    client: "BlueRock.io",
    summary: "Ship and secure agents",
    highlights: [
      "Built an autonomous QA agent that self qualifies NOVA microhypervisor builds across 29 hardware configurations and cloud bare metal, cutting multi hour supervised cycles to minutes.",
      "Shipped it as a Slack bot with natural language commands, budget guardrails and failure aware retries that cut cloud spend and flaky reruns.",
      "Ran adversarial testing and threat modeling on LLMs, agentic frameworks and MCP systems, uncovering real attack vectors before they could be exploited.",
      "Added automated AI security scanning to LLM deployments, replacing periodic manual review with checks on every build.",
    ],
    projects: ["autonomous-qa-agent", "red-teaming-agentic-systems"],
  },
  {
    company: "Emumba",
    title: "AI Software Engineer",
    start: "Mar 2025",
    end: "Sep 2025",
    summary: "Orchestrate agents",
    highlights: [
      "Architected Genie Mentor, a multi agent RAG onboarding platform that cut senior engineer support hours by 50%+.",
      "Designed a planner, retriever, executor, evaluator and editor workflow over MCP tools for GitHub, Notion and Confluence, unifying 3 silos into one query path.",
      "Fine tuned Qwen 2.5 3B and Mistral 7B for function calling and RAG tool use, giving the platform smaller, cheaper models that handle structured tool calls.",
      "Built a DSPy evaluation and prompt optimization workflow, replacing manual trial and error with measurable, repeatable iteration.",
    ],
    projects: ["genie-mentor", "fine-tuning-function-calling"],
  },
  {
    company: "Afiniti",
    title: "AI Software Engineer",
    start: "Jul 2023",
    end: "Mar 2025",
    summary: "Understand conversations",
    highlights: [
      "Built STT pipelines on Canary-1B and Whisper under 5% WER, with domain specific validation for NER and numerical accuracy.",
      "Deployed intent, sentiment, emotion, summarization and offer detection models at 95%+ accuracy, automating manual call review.",
      "Cut data labeling turnaround by ~50% with Mistral and LLaMA-3.",
      "Built a LangChain + Phi-3 support assistant demoed to Salesforce, and a 96% accurate telecom churn model.",
    ],
    projects: ["call-intelligence"],
  },
  {
    company: "CureMD",
    title: "R&D Fellow",
    start: "Aug 2022",
    end: "Apr 2023",
    summary: "Automate decisions",
    highlights: [
      "Built a clinical decision support system validating cancer treatment plans against NCCN guidelines through a machine readable knowledge graph that doubles as a reusable clinical knowledge base.",
    ],
    projects: ["clinical-decision-support"],
  },
];

export const education = {
  degree: "BS Computer Science",
  school: "FAST National University of Computer and Emerging Sciences (FAST NUCES)",
  start: "Aug 2019",
  end: "Jun 2023",
};

/**
 * Add certifications here as you earn them; the section renders them
 * automatically. Left empty because the resume lists none.
 */
export const certifications: { name: string; issuer: string; year: string; url?: string }[] = [];

export type SkillGroup = { category: string; skills: { name: string; project?: string }[] };

export const skills: SkillGroup[] = [
  {
    category: "Agentic frameworks",
    skills: [
      { name: "AutoGen" },
      { name: "CrewAI", project: "nl-to-sql-assistant" },
      { name: "LangChain", project: "call-intelligence" },
      { name: "Google ADK" },
      { name: "OpenAI Agents SDK" },
      { name: "MCP", project: "genie-mentor" },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "NLP and NLU", project: "call-intelligence" },
      { name: "LLMs", project: "fine-tuning-function-calling" },
      { name: "STT / TTS", project: "call-intelligence" },
      { name: "Multi agent systems", project: "genie-mentor" },
      { name: "RAG", project: "genie-mentor" },
      { name: "Prompt engineering", project: "fine-tuning-function-calling" },
      { name: "Fine tuning", project: "fine-tuning-function-calling" },
      { name: "Tool calling", project: "fine-tuning-function-calling" },
      { name: "MLOps" },
    ],
  },
  {
    category: "AI security",
    skills: [
      { name: "AI infrastructure security", project: "red-teaming-agentic-systems" },
      { name: "Adversarial AI", project: "red-teaming-agentic-systems" },
      { name: "Red teaming", project: "red-teaming-agentic-systems" },
      { name: "Threat modeling", project: "red-teaming-agentic-systems" },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "vLLM" },
      { name: "Transformers" },
      { name: "DSPy", project: "fine-tuning-function-calling" },
      { name: "FastAPI" },
      { name: "scikit learn" },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "Pinecone" },
      { name: "Qdrant" },
      { name: "ChromaDB" },
      { name: "PostgreSQL", project: "nl-to-sql-assistant" },
      { name: "MySQL" },
      { name: "NumPy" },
      { name: "Pandas" },
    ],
  },
  {
    category: "Languages",
    skills: [{ name: "Python", project: "autonomous-qa-agent" }, { name: "C++" }, { name: "OOP and design patterns" }],
  },
  {
    category: "Cloud and DevOps",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
      { name: "REST APIs" },
    ],
  },
];

/* ───────────── /cv market toggle (brief §6) ───────────── */

export type Market = "ksa" | "eu" | "canada";

export const markets: Record<
  Market,
  {
    label: string;
    locationLine: string;
    lead: string;
    emphasis: string[];
    featured: string[];
    cvFile: string;
    notes: string;
  }
> = {
  ksa: {
    label: "KSA",
    locationLine: "Based in Riyadh, available immediately",
    lead: "AI Engineer delivering autonomous agents and AI security for enterprise automation.",
    emphasis: [
      "Autonomous QA agent that replaces multi hour supervised test cycles with minutes",
      "Adversarial testing and threat modeling of LLMs, agent frameworks and MCP systems",
      "Enterprise delivery for international clients, ready for Vision 2030 scale projects",
    ],
    featured: ["autonomous-qa-agent", "red-teaming-agentic-systems", "genie-mentor"],
    cvFile: "/cv/Faraya_Baig_AI_Resume.pdf",
    notes: "Two page CV. Photo acceptable.",
  },
  eu: {
    label: "EU",
    locationLine: "Based in Riyadh, open to relocation anywhere",
    lead: "AI Engineer with depth in LLM fine tuning, evaluation and responsible, secure AI systems.",
    emphasis: [
      "Fine tuned Qwen 2.5 3B and Mistral 7B for function calling, with a DSPy evaluation loop",
      "Security by design: automated AI security scanning on every build",
      "Privacy aware engineering with awareness of the EU AI Act and GDPR",
    ],
    featured: ["fine-tuning-function-calling", "red-teaming-agentic-systems", "genie-mentor"],
    cvFile: "/cv/Faraya_Baig_AI_Resume.pdf",
    notes: "Two page CV. No photo.",
  },
  canada: {
    label: "Canada",
    locationLine: "Based in Riyadh, open to relocation anywhere",
    lead: "AI Engineer focused on practical impact: systems that save teams real hours.",
    emphasis: [
      "Genie Mentor cut senior engineer support hours by 50%+",
      "Call intelligence pipeline: under 5% WER and 95%+ accurate NLP models in production",
      "Clear communicator, comfortable working across time zones from Riyadh to Toronto",
    ],
    featured: ["genie-mentor", "call-intelligence", "autonomous-qa-agent"],
    cvFile: "/cv/Faraya_Baig_AI_Resume.pdf",
    notes: "Two page, achievement focused CV. No photo, age or marital status.",
  },
};
