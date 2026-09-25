import { notFound } from "next/navigation";
import { features, getFeature } from "@/lib/features";
import { FeaturePage } from "@/components/FeaturePage";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeature(slug);

  if (!feature) {
    notFound();
  }

  const { default: Content } = await import(`@/content/${slug}.mdx`);

  return (
    <FeaturePage feature={feature}>
      <Content />
    </FeaturePage>
  );
}
