import Link from "next/link";
import { Section } from "./Section";
import { features, featureCategoryOrder } from "@/lib/features";

const orderedFeatures = featureCategoryOrder.flatMap((category) =>
  features.filter((feature) => feature.category === category),
);

export function Features() {
  return (
    <Section id="features" className="border-t border-ink/10 dark:border-paper/10">
      <div className="h-1 w-10 bg-brand" />
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl dark:text-paper">
        Agents I built
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orderedFeatures.map((feature) => (
          <Link
            key={feature.slug}
            href={`/soundboard/${feature.slug}`}
            className="group block overflow-hidden rounded-xl border border-ink/10 bg-background transition duration-200 hover:-translate-y-1 hover:border-brand-strong/40 hover:shadow-lg hover:shadow-ink/5 dark:border-paper/10 dark:hover:border-brand/40 dark:hover:shadow-black/30"
          >
            {/* TODO(patricio): screenshot or diagram for this feature. */}
            <div className="flex aspect-video items-center justify-center border-b border-dashed border-ink/15 bg-ink/[.03] text-xs text-ink/40 dark:border-paper/15 dark:bg-paper/[.04] dark:text-paper/40">
              TODO: image
            </div>
            <div className="p-5">
              <span className="inline-block rounded-full bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand-strong dark:bg-brand/10 dark:text-brand">
                {feature.category}
              </span>
              <h3 className="mt-3 text-base font-medium text-ink transition-colors group-hover:text-brand-strong dark:text-paper dark:group-hover:text-brand">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">{feature.problem}</p>
              <p className="mt-1 text-sm text-ink/70 dark:text-paper/70">{feature.result}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
