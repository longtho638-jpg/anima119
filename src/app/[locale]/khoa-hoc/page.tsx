import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import KhoaHocContent from "./khoa-hoc-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "KhoaHoc" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/khoa-hoc",
    locale,
    type: "article",
  });
}

export default async function KhoaHocPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd path="/khoa-hoc" locale={locale} />
      <KhoaHocContent />
    </>
  );
}
