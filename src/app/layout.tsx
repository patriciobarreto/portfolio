import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patricio Barreto",
  description:
    "Full-stack engineer and founding, sole engineer at Soundboard, a multi-tenant tax and bookkeeping SaaS platform. Builds LLM agent systems end to end, keeping financial logic deterministic in code and scoping LLMs to interpretation.",
  openGraph: {
    title: "Patricio Barreto",
    description:
      "Full-stack engineer and founding, sole engineer at Soundboard, a multi-tenant tax and bookkeeping SaaS platform. Builds LLM agent systems end to end, keeping financial logic deterministic in code and scoping LLMs to interpretation.",
    // TODO(patricio): add public/og.png (1200x630).
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <Nav />
        {/* Nav renders its header `visibility: hidden` unconditionally,
            because the server has no way to know the scroll position, so it
            always renders the resting (square, full-width) shape — showing
            that first and letting Nav's own layout effect fix it on hydrate
            still means a scrolled-down refresh visibly flashes resting-then-
            pill, since parsing and hydrating JS takes measurably longer than
            the browser painting the plain server HTML. This runs
            synchronously during HTML parsing, before that first paint,
            applies the same formulas Nav.tsx uses, and is what actually
            reveals the header — so there's simply nothing shown until it's
            known to be correct. Falls back to Nav's own layout effect (which
            unconditionally reveals it too) if anything here doesn't apply,
            and to the <noscript> rule below if JS is unavailable entirely. */}
        <Script id="nav-pill-precorrect" strategy="beforeInteractive">
          {`(function(){
            var nav = document.querySelector('header nav');
            try {
              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                var heroHeight = window.innerHeight - 64;
                var p = heroHeight > 0 ? Math.min(Math.max(window.scrollY / heroHeight, 0), 1) : 0;
                if (p > 0) {
                  var height = 64 - 16 * p;
                  var vw = window.innerWidth;
                  var compactWidth = Math.min(vw * 0.9, 672);
                  var width = vw + (compactWidth - vw) * p;
                  nav.style.height = height + 'px';
                  nav.style.width = width + 'px';
                  nav.style.marginTop = (12 * p) + 'px';
                  nav.style.setProperty('--gutter-progress', p);
                  nav.style.setProperty('--nav-radius', Math.min(999 * p, height / 2));
                }
              }
            } catch (e) {}
            if (nav) nav.style.visibility = 'visible';
          })();`}
        </Script>
        <noscript>
          <style>{`header nav { visibility: visible !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
