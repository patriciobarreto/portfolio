"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type MouseEvent } from "react";

const links = [
  { href: "/#features", label: "Work", sectionId: "features" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/resume.pdf", label: "Resume", sectionId: undefined },
];

// Next's <Link> hash-scroll is inconsistent on same-page navigation
// (doesn't always fire on the first click). Scroll explicitly instead, and
// only fall back to normal Link navigation when the section isn't on the
// current page (e.g. clicking from a /soundboard/* feature page).
function scrollToSection(event: MouseEvent, sectionId: string | undefined) {
  if (!sectionId) return;
  const target = document.getElementById(sectionId);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", `/#${sectionId}`);
}

// Same fix as above, for the logo: clicking "/" while already on "/" is a
// same-page no-op as far as the router is concerned, so it won't scroll.
function scrollToTop(event: MouseEvent) {
  if (window.location.pathname !== "/") return;
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  history.pushState(null, "", "/");
}

export function Nav() {
  const reduceMotion = useReducedMotion();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // The sentinel is sized exactly like the hero (same dvh formula) and owned
  // by this component, so Motion tracks it directly instead of us measuring
  // another component's DOM node by hand. progress: 0 when the sentinel's
  // top reaches the viewport top (scroll start), 1 when its bottom does
  // (i.e. exactly one hero-height of scrolling later).
  const { scrollYProgress: progress } = useScroll({
    target: sentinelRef,
    offset: ["start start", "end start"],
  });

  const height = useTransform(progress, [0, 1], [64, 48]);
  // A single linear ramp from full viewport width down to one concrete
  // target (capped at 672px on wide screens). Previously this was two
  // separately-animated constraints combined via CSS min() — width% and
  // max-width — which cross over partway through the scroll and produce a
  // kink: barely shrinking, then suddenly doing most of the shrink in the
  // last few percent. A single ramp to one pre-computed target has no kink.
  const width = useTransform(() => {
    const p = progress.get();
    // Matches the server-rendered value exactly at rest (p === 0, true on
    // both server and the client's pre-hydration render), so there's no
    // hydration mismatch. Only switches to a pixel value once the user has
    // actually scrolled, which only happens client-side after hydration.
    if (p === 0 || typeof window === "undefined") return "100%";
    const viewportWidth = window.innerWidth;
    const compactWidth = Math.min(viewportWidth * 0.9, 672);
    return viewportWidth + (compactWidth - viewportWidth) * p;
  });
  const marginTop = useTransform(progress, [0, 1], [0, 12]);
  const borderRadius = useTransform(progress, [0, 1], [0, 999]);

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute left-0 top-0 h-[calc(100dvh-4rem)] w-px"
        aria-hidden="true"
      />
      <header className="sticky top-0 z-50 flex w-full justify-center">
        <motion.nav
          style={
            reduceMotion
              ? { height: 64, width: "100%", marginTop: 0, borderRadius: 0 }
              : { height, width, marginTop, borderRadius }
          }
          className="mx-auto flex items-center justify-between gap-6 border border-ink/10 bg-background/90 px-4 shadow-sm shadow-ink/5 backdrop-blur-md sm:px-6 dark:border-paper/10 dark:shadow-black/20"
        >
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-ink dark:text-paper"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            Patricio Barreto
          </Link>
          <ul className="flex items-center gap-6 text-sm font-medium">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link.sectionId)}
                  className="text-ink/70 transition-colors hover:text-ink dark:text-paper/70 dark:hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </header>
    </>
  );
}
