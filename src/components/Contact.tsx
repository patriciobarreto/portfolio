import { Section } from "./Section";
import { contactLinks } from "@/lib/links";

export function Contact() {
  return (
    <Section id="contact" className="border-t border-ink/10 pb-24 dark:border-paper/10">
      <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl dark:text-paper">
        Contact
      </h2>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full border border-ink/15 px-4 py-2 text-ink transition-colors hover:border-brand hover:text-brand-strong dark:border-paper/20 dark:text-paper dark:hover:border-brand dark:hover:text-brand"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
