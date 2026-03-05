import dynamic from "next/dynamic";
import { BenefitsSection } from "@/components/home/benefits-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ProcessSection } from "@/components/home/process-section";
import { CTASection } from "@/components/home/cta-section";
import { MainLayout, FooterSection } from "@/components/layout";
import { generatePageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return generatePageMetadata({
    title: t("title"),
    description: t("welcome"),
    path: "/",
    locale,
    type: "website",
  });
}

// Dynamic imports for heavy components
const HeroParallax = dynamic(
  () => import("@/components/ui/hero-parallax").then((mod) => ({ default: mod.HeroParallax })),
  { loading: () => null }
);

const StorySectionAnimated = dynamic(
  () => import("@/components/home/story-section-animated").then((mod) => ({ default: mod.StorySectionAnimated })),
  { loading: () => null }
);

const FeatureShowcase = dynamic(
  () => import("@/components/home/feature-showcase").then((mod) => ({ default: mod.FeatureShowcase })),
  { loading: () => null }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainLayout>
        <HeroParallax />
        <BenefitsSection />
        <StorySectionAnimated />
        <FeaturedProducts />
        <ProcessSection />
        <FeatureShowcase />
        <CTASection />
        <FooterSection />
      </MainLayout>
    </div>
  );
}
