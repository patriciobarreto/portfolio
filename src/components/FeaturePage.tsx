import Link from "next/link";
import type { ReactNode } from "react";
import { getNextFeature, type Feature } from "@/lib/features";

export function FeaturePage({
  feature,
  children,
}: {
  feature: Feature;
  children: ReactNode;
}) {
  const next = getNextFeature(feature.slug);

  return (
    <main className="page-gutter w-full flex-1 py-16 md:py-24">
      <p className="text-sm font-medium text-brand-strong dark:text-brand">{feature.category}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl dark:text-paper">
        {feature.title}
      </h1>
      {children}
      <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t border-ink/10 pt-8 text-sm font-medium dark:border-paper/10">
        <Link
          href="/"
          className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-brand-strong dark:text-paper dark:hover:text-brand"
        >
          Back to home
        </Link>
        <Link
          href={`/soundboard/${next.slug}`}
          className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-brand-strong dark:text-paper dark:hover:text-brand"
        >
          Next: {next.title}
        </Link>
      </footer>
    </main>
  );
}
