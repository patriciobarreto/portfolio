export type FeatureCategory =
  | "Bookkeeping"
  | "Tax preparation"
  | "Client operations"
  | "Internal engineering";

export type Feature = {
  slug: string;
  title: string;
  category: FeatureCategory;
  problem: string;
  result: string;
};

// Canonical order also drives feature-page prev/next navigation.
export const features: Feature[] = [
  {
    slug: "tax-agent",
    title: "Tax-filing agent",
    category: "Tax preparation",
    problem: "A Form 1120-S return has dozens of interdependent line items, normally assembled by hand.",
    result: "Validated against 35 CPA-prepared returns, with matching output in 34.",
  },
  {
    slug: "client-summary",
    title: "Client summary pipeline",
    category: "Client operations",
    problem: "Preparers spent about 30 minutes per client piecing together context before every call.",
    result: "Cut review time to about 5 minutes per client, an ~83% reduction.",
  },
  {
    slug: "categorization",
    title: "Transaction categorization",
    category: "Bookkeeping",
    problem: "The original categorizer was slow (~20s), plateaued at 90% accuracy, and was a black box.",
    result: "Cut latency to ~3s and raised accuracy to 99%, measured against user-verified categories.",
  },
  {
    slug: "ops-qa",
    title: "Ops Q&A agent",
    category: "Client operations",
    problem: "Admins drafted every client reply from scratch, without a fast way to ground it in firm precedent.",
    result: "Live in production drafting real client communications; accept-rate and edit-distance metrics pending as usage data accumulates.",
  },
  {
    slug: "bugbot",
    title: "BugBot",
    category: "Internal engineering",
    problem: "As the sole engineer, I was the only one catching production errors, so anything I missed stayed missed.",
    result: "Cut manual triage time by about 30%.",
  },
  {
    slug: "eval-harness",
    title: "Eval harness",
    category: "Internal engineering",
    problem: "No dedicated way to catch agent regressions before they reached production.",
    result: "Built a golden-dataset regression framework (exact-match and LLM-as-judge scoring) and used it to catch regressions pre-production.",
  },
];

export const featureCategoryOrder: FeatureCategory[] = [
  "Bookkeeping",
  "Tax preparation",
  "Client operations",
  "Internal engineering",
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function getNextFeature(slug: string): Feature {
  const index = features.findIndex((f) => f.slug === slug);
  return features[(index + 1) % features.length];
}
