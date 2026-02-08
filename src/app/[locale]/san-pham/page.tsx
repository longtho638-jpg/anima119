import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import SanPhamContent from "./san-pham-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SanPham" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/san-pham",
    locale,
    type: "product",
  });
}

export default function SanPhamPage() {
  return <SanPhamContent />;
}
