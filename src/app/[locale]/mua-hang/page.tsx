import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
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

export default function MuaHangPage() {
  return <MuaHangContent />;
}
