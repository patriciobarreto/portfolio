import { Section } from "./Section";

export function Code() {
  return (
    <Section id="code" tone="panel">
      <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl dark:text-paper">
        Code
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        Production work lives in Soundboard&apos;s private repositories.{" "}
        {/* TODO(patricio): link public code, if any. */}
        TODO: link public code. Happy to walk through the codebase on a call.
      </p>
    </Section>
  );
}
