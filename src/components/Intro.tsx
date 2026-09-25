import { contactLinks } from "@/lib/links";

export function Intro() {
  return (
    <section id="hero" className="page-gutter flex min-h-[calc(100dvh-4rem)] w-full flex-col justify-center">
      <h1 className="max-w-3xl text-6xl font-semibold tracking-tight text-ink md:text-7xl dark:text-paper">
        Patricio Barreto
      </h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink/70 dark:text-paper/70">
        Founding engineer who built production AI agents solo, from hybrid retrieval to the
        client-facing platform they run in. Looking to join an early-stage, AI-native team.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-brand-strong dark:text-paper dark:hover:text-brand"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
