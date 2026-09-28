"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PRIMARY_PILL_CLASS } from "./pillStyles";

type Status = "idle" | "copied";

export function EmailButton({ href }: { href: string }) {
  const email = href.replace(/^mailto:/, "");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "copied") return;
    const timer = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleCopy() {
    try {
      // Throws the same way whether the Clipboard API doesn't exist at all
      // (navigator.clipboard is undefined) or the write itself fails (e.g. a
      // denied permission), so one catch covers falling back to a mailto
      // navigation in both cases.
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      window.location.href = href;
    }
  }

  return (
    <div className="relative inline-block">
      <button type="button" onClick={handleCopy} className={PRIMARY_PILL_CLASS}>
        {email}
      </button>
      {/* Absolutely positioned (out of flow) so it can't affect layout
          anywhere — Intro vertically centers its whole content block, so
          even growing the row's height by a couple pixels shifted the
          entire headline up to stay centered. Given its own pill background
          and elevation rather than floating as bare text, since on narrow
          viewports where GitHub/LinkedIn/Resume wrap onto the next line it
          sits over them; the pill keeps it legible either way. */}
      <AnimatePresence>
        {status === "copied" && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-ink/10 bg-background px-3 py-1 text-sm text-ink/70 shadow-sm shadow-ink/5 dark:border-paper/10 dark:bg-ink dark:text-paper/70"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
