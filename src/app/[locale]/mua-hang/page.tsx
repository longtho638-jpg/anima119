import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import MuaHangContent from "./mua-hang-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MuaHang" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/mua-hang",
    locale,
    type: "website",
  });
}

export default async function MuaHangPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd path="/mua-hang" locale={locale} />
      <MuaHangContent />
    </>
  );
}
