import { contactLinks } from "@/lib/links";
import { EmailButton } from "./EmailButton";
import { PILL_CLASS } from "./pillStyles";

export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-sm font-medium ${className}`}>
      {contactLinks.map((link) =>
        link.label === "Email" ? (
          <EmailButton key={link.label} href={link.href} />
        ) : (
          <a
            key={link.label}
            href={link.href}
            target={link.target}
            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
            className={PILL_CLASS}
          >
            {link.label}
          </a>
        ),
      )}
    </div>
  );
}
