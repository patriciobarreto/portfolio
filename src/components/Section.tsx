import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  tone = "default",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "default" | "panel";
  children: ReactNode;
}) {
  const toneClass = tone === "panel" ? "bg-brand/10 dark:bg-brand/[0.06]" : "";

  return (
    <section
      id={id}
      className={`page-gutter flex w-full min-h-[100dvh] scroll-mt-20 flex-col justify-center py-16 md:py-24 ${toneClass} ${className}`}
    >
      {children}
    </section>
  );
}
