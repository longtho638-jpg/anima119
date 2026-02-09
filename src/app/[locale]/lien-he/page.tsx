import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import LienHeContent from "./lien-he-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LienHe" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/lien-he",
    locale,
    type: "website",
  });
}

export default async function LienHePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd path="/lien-he" locale={locale} />
      <LienHeContent />
    </>
  );
}
