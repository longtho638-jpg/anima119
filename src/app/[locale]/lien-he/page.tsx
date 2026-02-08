import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
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

export default function LienHePage() {
  return <LienHeContent />;
}
