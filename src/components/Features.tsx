import Link from "next/link";
import { Section } from "./Section";
import { features, featureCategoryOrder } from "@/lib/features";

export function Features() {
  return (
    <Section id="features" className="border-t border-ink/10 dark:border-paper/10">
      <div className="h-1 w-10 bg-brand" />
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl dark:text-paper">
        Features I built
      </h2>
      <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {featureCategoryOrder.map((category) => (
          <div key={category}>
            <span className="inline-block rounded-full bg-brand/15 px-2.5 py-1 text-xs font-semibold text-brand-strong dark:bg-brand/10 dark:text-brand">
              {category}
            </span>
            <ul className="mt-4 divide-y divide-ink/10 dark:divide-paper/10">
              {features
                .filter((f) => f.category === category)
                .map((feature) => (
                  <li key={feature.slug} className="py-4">
                    <Link
                      href={`/soundboard/${feature.slug}`}
                      className="text-base font-medium text-ink transition-colors hover:text-brand-strong dark:text-paper dark:hover:text-brand"
                    >
                      {feature.title}
                    </Link>
                    <p className="mt-1 text-sm text-ink/70 dark:text-paper/70">{feature.problem}</p>
                    <p className="mt-1 text-sm text-ink/70 dark:text-paper/70">{feature.result}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
