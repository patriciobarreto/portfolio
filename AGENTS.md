# Portfolio

Personal portfolio site for Patricio Barreto. Audience: technical founders and engineers at early-stage AI startups deciding whether to talk to him. The site presents Soundboard, a multi-tenant tax and bookkeeping SaaS he built as sole engineer, and the AI agents he built as features inside it.

## Stack

- Next.js 16, App Router, TypeScript, Tailwind CSS
- MDX via @next/mdx for feature pages
- Code lives in src/
- Deployed on Vercel; every push to main goes to production

## Structure

- src/app/page.tsx: home page, built from section components in src/components/
- src/app/soundboard/[slug]/page.tsx: one route renders every feature page
- src/content/\*.mdx: feature page content, one file per feature
- src/mdx-components.tsx: styled overrides for MDX elements
- public/: resume.pdf, og.png

Home sections, in order: intro, Soundboard, platform architecture, features, how I build agents, working without a PM, experience, about, contact.

Feature pages use the same sections: where it fits in Soundboard, problem and origin, constraints, architecture, key decisions and tradeoffs, evaluation and reliability, results, what I'd do differently.

## Writing rules

- No em dashes. Use commas, periods, or parentheses.
- No buzzwords or marketing language.
- Never invent metrics, results, or facts. Only use numbers and claims Patricio provides. If something is missing, leave a TODO and ask.
- Direct, plain sentences. The writing is evaluated as evidence of how he communicates.

## Confidentiality

Soundboard's code is private. Never add real client data, real company names from Soundboard's customers, credentials, or code copied from Soundboard repos. Code snippets must be short, sanitized, and approved by Patricio before publishing.

## Design

- Palette starting point: #8ED1A8 (green) and #1F2429 (near-black), taken from the favicon.
- Content over decoration. Minimal, purposeful motion; respect prefers-reduced-motion.
- Must work on mobile, in light and dark mode, and load fast.
- For new UI, use the design-taste-frontend skill. For reviews, use web-design-guidelines. For animation, use emil-design-eng and the animation skills.

## Workflow

- Commands: npm run dev, npm run build, npm run lint
- Before calling a UI task done: run lint and build, then check the page with playwright-cli screenshots at mobile and desktop widths.
- The repo is public. Never commit secrets or .env files. graphify-out/ is gitignored.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
