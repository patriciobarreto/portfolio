import Link from "next/link";
import { Section } from "./Section";

const principles = [
  { label: "Deterministic financial logic", href: "/soundboard/client-summary" },
  { label: "Scoped tools", href: "/soundboard/tax-agent" },
  { label: "Retrieval evaluated separately", href: "/soundboard/categorization" },
  { label: "Corrections feeding back into retrieval", href: "/soundboard/ops-qa" },
  { label: "Reliability and audit logging", href: "/soundboard/bugbot" },
];

export function HowIBuildAgents() {
  return (
    <Section id="how-i-build-agents" className="border-t border-ink/10 dark:border-paper/10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl dark:text-paper">
        How I build agents
      </h2>
      <ul className="mt-6 divide-y divide-ink/10 dark:divide-paper/10">
        {principles.map((principle) => (
          <li key={principle.label} className="flex items-center gap-3 py-3">
            <span className="h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
            <Link
              href={principle.href}
              className="text-base text-ink/80 transition-colors hover:text-brand-strong dark:text-paper/80 dark:hover:text-brand"
            >
              {principle.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        The infrastructure behind these is shared across every agent, not built per project: a
        TypeScript service owns orchestration and durable state, a Python service owns the LLM
        calls, and both share the same retry and degraded-mode handling, so a failure in one
        agent&apos;s AI layer doesn&apos;t take down its orchestration layer.
      </p>
    </Section>
  );
}
