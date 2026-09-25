import { Section } from "./Section";

export function PlatformArchitecture() {
  return (
    <Section id="architecture" tone="panel">
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl dark:text-paper">
        Platform architecture
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        Every agent in Soundboard follows the same split: a TypeScript service owns orchestration,
        durable state, and reliability (retries, leases, audit logging), and a Python service owns
        the LLM calls, retrieval, and document processing. The same cross-service client and
        degraded-mode handling is shared across all of them, so a failure in one agent&apos;s AI
        layer doesn&apos;t take down its orchestration layer.
      </p>
      {/* TODO(patricio): one diagram of the whole system, with each agent shown as a component inside it. */}
      <div className="mt-6 flex aspect-video items-center justify-center rounded-lg border border-dashed border-brand-strong/40 bg-background text-sm text-ink/50 dark:border-brand/30 dark:text-paper/50">
        TODO: system diagram (each agent as a component)
      </div>
    </Section>
  );
}
