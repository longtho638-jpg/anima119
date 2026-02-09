import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import NguonGocContent from "./nguon-goc-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NguonGoc" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/nguon-goc",
    locale,
    type: "article",
  });
}

export default async function NguonGocPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd path="/nguon-goc" locale={locale} />
      <NguonGocContent />
    </>
  );
}
