/** Quick retrieval sanity check: npx tsx scripts/ask-retrieval-check.ts */
import { retrieve } from "../lib/ask/retrieve";
const qs = [
  "What agents has Faraya built?",
  "Tell me about her speech to text work",
  "Does Faraya have AI security experience?",
  "What fine tuning has she done?",
  "Is Faraya open to relocation to Canada?",
  "How can I contact Faraya?",
  "What is GRPO used for in her work?",
  "Has she worked with MCP?",
  "What was the voice assistant result?",
  "Healthcare experience?",
];
for (const q of qs) console.log(q, "\n   ", retrieve(q, 5).map((r) => r.title).join("  |  "));
