"use client";

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
    <>
      <button type="button" onClick={handleCopy} className={PRIMARY_PILL_CLASS}>
        {status === "copied" ? "Copied" : email}
      </button>
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
