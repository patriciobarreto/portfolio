import { Section } from "./Section";
import { ContactLinks } from "./ContactLinks";

export function Contact() {
  return (
    <Section id="contact" className="border-t border-ink/10 pb-24 dark:border-paper/10">
      <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl dark:text-paper">
        Contact
      </h2>
      <ContactLinks className="mt-6" />
    </Section>
  );
}
