import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata";
import TinTucContent from "./tin-tuc-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TinTuc" });

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/tin-tuc",
    locale,
    type: "website",
  });
}

export default function TinTucPage() {
  return <TinTucContent />;
}
