import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" className="border-t border-ink/10 dark:border-paper/10">
      <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl dark:text-paper">
        About
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        I&apos;m a Peruvian software engineer based in Mexico City. I studied Computer Engineering
        and Computer Science, with a minor in Mathematics, at Northeastern University, then
        self-taught the rest of the stack and AI/ML systems on the job as Soundboard&apos;s
        founding engineer. Bilingual in Spanish and English, and I work directly with the
        bookkeepers and tax preparers using what I build.
      </p>
    </Section>
  );
}
