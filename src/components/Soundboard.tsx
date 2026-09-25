import { Section } from "./Section";

export function Soundboard() {
  return (
    <Section id="soundboard" className="border-t border-ink/10 dark:border-paper/10">
      <div className="h-1 w-10 bg-brand" />
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl dark:text-paper">
        Soundboard
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        Soundboard is a multi-tenant SaaS platform for tax and bookkeeping firms, built for the
        bookkeepers and tax preparers who run client work through it every day. I&apos;m the
        founding and sole engineer, building the platform end to end (100+ data models, 70+ API
        endpoints) with no PM layer.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        Scaled from 0 to 150 monthly users and $50k MRR.
      </p>
    </Section>
  );
}
