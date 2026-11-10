# Faraya Baig · Portfolio

Personal portfolio for Faraya Baig, AI Engineer (agentic AI, conversational and speech AI, LLM fine tuning, AI security).
Built from `PORTFOLIO_BRIEF.md` with the resume in `public/cv/` as the source of truth.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui style primitives · Framer Motion · MDX (next-mdx-remote) · next-themes

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/
  page.tsx                  Home: hero → proof strip → projects → what I do → architecture → experience → skills → writing → education → contact
  projects/[slug]/          Case study pages (+ per page OG image)
  blog/ , blog/[slug]/      MDX blog (+ per post OG image)
  cv/                       Web CV; the PDF is generated from the same data (npm run cv:pdf)
  api/ask/route.ts          "Ask my portfolio" API (phase 1: guard + rate limit + retrieval)
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/
  sections/                 One file per home page section
  ui/                       Button, Card, Badge, Section
  terminal.tsx counter.tsx  Signature interactions
  ask-portfolio-*.tsx       Chat launcher (lazy) and panel
content/
  projects/*.mdx            One file per case study (frontmatter drives the TL;DR card)
  blog/*.mdx
lib/
  site.ts                   All resume facts, metrics, skills and market config
  content.ts                MDX loader
  ask/                      Retriever (BM25) and input guard
```

## Design tokens

Defined once in `app/globals.css` (`:root` = light, `.dark` = dark, dark is default):

| Token | Dark | Light |
| --- | --- | --- |
| `bg` | #0B0F14 | #FAFAF7 |
| `surface` | #121821 | #FFFFFF |
| `border` | #1F2A37 | #E5E7EB |
| `fg` | #E6EDF3 | #0B0F14 |
| `muted` | #8B98A5 | #5B6470 |
| `accent` | #2DD4BF | #0D9488 |
| `accent-strong` (text/buttons, AA) | #2DD4BF | #0F766E |
| `amber` (metrics only) | #F5B942 | #B7791F |

Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code, tags, metrics), self hosted latin subsets via `next/font/local`.

## Configuration

| Env var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Optional: defaults to the Vercel production URL, so only set it once you own a custom domain |
| `NEXT_PUBLIC_BOOKING_URL` | Optional override for the "Book a 20 minute call" link (defaults to the Google Calendar appointment page) |

## Ask my portfolio

`app/api/ask/route.ts` guards the input (length, per IP rate limit, daily cap, injection patterns), retrieves
passages with a small BM25 index over the site's content (`lib/ask/retrieve.ts`), and streams an answer from
Claude Haiku 5.5 grounded only in those passages (`lib/ask/generate.ts`). Without `ANTHROPIC_API_KEY` it falls
back to returning the passages.

| Env var | Purpose |
| --- | --- |
| `LITELLM_BASE_URL` + `LITELLM_API_KEY` | Use a LiteLLM proxy (its Anthropic compatible `/v1/messages` endpoint) |
| `ANTHROPIC_API_KEY` | Or call Anthropic directly |
| `ASK_MODEL` | Model name; with LiteLLM, the name your proxy exposes (default `claude-haiku-5-5`) |
| `ASK_EFFORT` | Optional `low` / `medium` / `high`; left out automatically for Haiku 4.5 and older |
| `ASK_DAILY_CAP` | Optional answers per day per server instance (default 500) |

Check retrieval quality with `npx tsx scripts/ask-retrieval-check.ts`.
