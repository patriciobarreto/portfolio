"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

// useLayoutEffect warns when it runs during SSR; this component is
// client-only in practice (nothing here needs to work without JS), but it
// still gets server-rendered as part of the page, so the swap is needed.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const wrapperRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Closing via a link click skips the collapse animation (see
  // handleLinkClick) so it can't race the scroll it triggers.
  const [closeInstantly, setCloseInstantly] = useState(false);

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
  // Raw radius ramps 0 -> 999; CSS's border-radius clamps that back down to
  // half the element's height whenever it's applied symmetrically to all
  // four corners, which is how this normally renders. But flattening only
  // the bottom two corners while the dropdown is open (see the nav-gutter
  // rule below) breaks that symmetry, and the browser's radius-overlap
  // algorithm then hands the two zeroed-out bottom corners' whole budget to
  // the top corners — ballooning them to roughly the full height instead of
  // half. Clamping to height / 2 here ourselves keeps the top corners
  // pinned to the same value whether or not the bottom ones are flattened.
  const pillRadius = useTransform(() => Math.min(999 * progress.get(), height.get() / 2));

  // On a normal navigation this starts at scrollY 0 and everything above
  // tracks it from there with no gap. But a hard refresh while already
  // scrolled down lands the browser's native scroll restoration on the page
  // instantly, before Motion's own scroll listener has anything to react
  // to — so progress (and everything derived from it) sits stuck at its
  // resting value for a second or more despite the page already being
  // scrolled, then jumps to where it should've been the moment a real
  // scroll event finally reaches Motion. Seeding every motion value here
  // directly, from the sentinel's actual position before paint, skips that
  // stuck window — setting `progress` alone isn't enough, since the values
  // derived from it via useTransform don't appear to recompute from a
  // manual .set() the way they do from Motion's own internal scroll tick.
  //
  // This still isn't enough on its own: this effect can only run once React
  // has hydrated, and getting JS parsed and hydration running at all takes
  // measurably longer than the browser painting the plain server-rendered
  // HTML (which always shows the resting shape, since the server can't know
  // scroll position). That gap is what was still visibly flashing. The nav
  // renders `visibility: hidden` unconditionally for exactly that reason —
  // nothing is ever shown until it's known to be correct, whether that's
  // resolved by the blocking inline script in layout.tsx (the common case,
  // running before first paint) or, failing that, by this effect once
  // hydration does complete.
  useIsomorphicLayoutEffect(() => {
    const rect = sentinelRef.current?.getBoundingClientRect();
    if (rect && rect.height > 0) {
      const p = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      progress.set(p);
      height.set(64 - 16 * p);
      marginTop.set(12 * p);
      pillRadius.set(Math.min(999 * p, (64 - 16 * p) / 2));
      if (typeof window !== "undefined" && p > 0) {
        const viewportWidth = window.innerWidth;
        const compactWidth = Math.min(viewportWidth * 0.9, 672);
        width.set(viewportWidth + (compactWidth - viewportWidth) * p);
      }
    }
    if (navRef.current) navRef.current.style.visibility = "visible";
    // Empty deps: this is a one-time seed for the initial-load case, not a
    // running sync — Motion's own scroll listener takes over from here.
  }, []);

  // Close the menu on an outside click.
  useEffect(() => {
    if (!menuOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  function handleLinkClick(event: MouseEvent, sectionId: string | undefined) {
    // The clicked link is focused; blur it now so the browser's "keep focus
    // visible" behavior doesn't fire its own scroll jump once the accordion
    // unmounts it below.
    (event.currentTarget as HTMLElement).blur();
    // Collapsing the accordion with its normal animation shifts every
    // section below it up while that runs, which reliably cancels an
    // in-progress smooth scrollIntoView outright (the browser drops it when
    // the page layout shifts under it). Skip the exit animation here so the
    // collapse and the scroll never overlap.
    setCloseInstantly(true);
    setMenuOpen(false);
    if (!sectionId) return;
    event.preventDefault();
    // Even with the exit animation skipped, React hasn't committed the
    // collapse to the DOM yet at this point in the handler — that lands over
    // the next couple of frames. Starting the scroll before then still races
    // the resulting layout shift and gets cancelled, so wait for it to
    // actually paint first.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        history.pushState(null, "", `/#${sectionId}`);
      });
    });
  }

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute left-0 top-0 h-[calc(100dvh-4rem)] w-px"
        aria-hidden="true"
      />
      <header ref={wrapperRef} className="sticky top-0 z-50 flex w-full flex-col items-center relative">
        <motion.nav
          ref={navRef}
          // The blocking inline script in layout.tsx deliberately mutates
          // this element's style before React ever hydrates it (see that
          // script for why), so the server-rendered markup React expects to
          // find and what's actually in the DOM by the time it hydrates
          // legitimately differ — suppress the warning for that expected
          // mismatch rather than fighting it.
          suppressHydrationWarning
          // Hidden until the layout effect below (or, before that ever runs,
          // the blocking inline script in layout.tsx) has resolved the
          // correct shape for the current scroll position and explicitly
          // reveals it — see that effect for why. Reduced-motion needs no
          // resolving (its shape never depends on scroll), but stays
          // consistent with the same reveal step rather than a special case.
          style={
            reduceMotion
              ? ({ height: 64, width: "100%", marginTop: 0, "--gutter-progress": 0, "--nav-radius": 0, visibility: "hidden" } as unknown as CSSProperties)
              : ({ height, width, marginTop, "--gutter-progress": progress, "--nav-radius": pillRadius, visibility: "hidden" } as unknown as CSSProperties)
          }
          // Radius is applied via the --nav-radius custom property (see
          // .nav-gutter in globals.css) rather than Motion's `borderRadius`
          // style key: Motion has special-cased handling for that key that
          // conflicts with also setting longhand corners, and CSS custom
          // properties sidestep it entirely. The bottom corners are flattened
          // with a plain `!important` class, which only needs to beat the
          // (non-important) rule .nav-gutter itself sets from the variable.
          //
          // Opaque background, no backdrop-blur: blurring a translucent
          // backdrop behind mixed content (text plus the rounded brand dot)
          // renders inconsistently in Chromium — the dot and logo text end
          // up less blurred than the rest of the bar, showing up as a
          // visibly different tinted patch around the logo. Opaque sidesteps
          // the compositing bug entirely instead of working around it.
          className={`nav-gutter mx-auto flex items-center justify-between gap-6 border border-ink/10 bg-background shadow-sm shadow-ink/5 dark:border-paper/10 dark:shadow-black/20 ${menuOpen ? "!rounded-b-none" : ""}`}
        >
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-ink dark:text-paper"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            Patricio Barreto
          </Link>

          {/* Full link row, replaced by the hamburger below 500px. */}
          <ul className="flex items-center gap-6 text-sm font-medium max-[500px]:hidden">
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

          <button
            type="button"
            onClick={() => {
              setCloseInstantly(false);
              setMenuOpen((open) => !open);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="hidden h-8 w-8 shrink-0 cursor-pointer items-center justify-center max-[500px]:flex"
          >
            {menuOpen ? (
              <span aria-hidden="true" className="text-xl leading-none text-ink dark:text-paper">
                &times;
              </span>
            ) : (
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 bg-ink dark:bg-paper" />
                <span className="h-0.5 w-5 bg-ink dark:bg-paper" />
                <span className="h-0.5 w-5 bg-ink dark:bg-paper" />
              </span>
            )}
          </button>
        </motion.nav>

        {/* Grows the header downward instead of floating a separate card:
            shares the exact same width motion value as the bar above, so
            its edges line up, and it's a plain accordion reveal (height
            0 -> auto), not scroll-linked, so a spring/eased transition
            here is appropriate (unlike the bar's own unsprung scroll morph).
            Absolutely positioned (top-full off the header) so it overlays
            the page instead of pushing content down as it opens. */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              style={reduceMotion ? { width: "100%" } : { width }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={closeInstantly ? { duration: 0 } : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full hidden max-[500px]:block mx-auto overflow-hidden rounded-b-2xl border-x border-b border-ink/10 bg-background shadow-sm shadow-ink/5 dark:border-paper/10 dark:shadow-black/20"
            >
              <ul className="flex flex-col gap-1 p-2 text-sm font-medium">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(event) => handleLinkClick(event, link.sectionId)}
                      className="block rounded-lg px-3 py-2 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink dark:text-paper/70 dark:hover:bg-paper/10 dark:hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
