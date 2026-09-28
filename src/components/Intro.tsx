import Image from "next/image";
import { ContactLinks } from "./ContactLinks";

export function Intro() {
  return (
    <section id="hero" className="page-gutter flex min-h-[calc(100dvh-4rem)] w-full flex-col justify-center">
      {/* flex-col-reverse + md:flex-row (not reversed) puts the photo above
          the text on mobile but keeps text-then-photo in the DOM, so it
          reads name-first for screen readers and lands on the right,
          paired with the headline, once there's room for both side by
          side. */}
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
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
        </div>
        <div className="w-40 shrink-0 overflow-hidden rounded-2xl border border-ink/10 shadow-sm shadow-ink/5 md:w-72 lg:w-80 dark:border-paper/10 dark:shadow-black/20">
          <Image
            src="/patricio-headshot.jpg"
            alt="Patricio Barreto"
            width={800}
            height={800}
            priority
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 160px"
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
