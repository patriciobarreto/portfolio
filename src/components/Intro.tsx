import { ContactLinks } from "./ContactLinks";

export function Intro() {
  return (
    <section id="hero" className="page-gutter flex min-h-[calc(100dvh-4rem)] w-full flex-col justify-center">
      <h1 className="max-w-3xl text-balance text-6xl font-semibold tracking-tight text-ink md:text-7xl dark:text-paper">
        Patricio Barreto
      </h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink/70 dark:text-paper/70">
        Founding engineer. I built Soundboard, a tax and bookkeeping SaaS, as its only engineer:
        the platform, the infrastructure, and the AI agents that run inside it.
      </p>
      <p className="mt-2 max-w-xl text-xl leading-relaxed text-ink/70 dark:text-paper/70">
        Looking for a founding or product engineering role at an early-stage, AI-native startup.
      </p>
      <ContactLinks className="mt-8" />
    </section>
  );
}
