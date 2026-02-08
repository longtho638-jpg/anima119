import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import PrivacyContent from "./privacy-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return generatePageMetadata({
    title: t("title"),
    description:
      locale === "vi"
        ? "Chinh sach bao mat thong tin ca nhan cua ANIMA 119"
        : "ANIMA 119 personal data privacy policy",
    path: "/privacy",
    locale,
    type: "article",
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
