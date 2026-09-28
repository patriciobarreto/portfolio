import { Section } from "./Section";

export function Code() {
  return (
    <Section id="code" tone="panel">
      <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl dark:text-paper">
        Code
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        Production work lives in Soundboard&apos;s private repositories. See{" "}
        <a
          href="https://github.com/patriciobarreto"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-ink/30 underline-offset-4 hover:text-brand-strong dark:hover:text-brand"
        >
          GitHub
        </a>{" "}
        for public code. Happy to walk through the codebase on a call.
      </p>
    </Section>
  );
}
