"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center bg-[#0A1628]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-6 text-center max-w-3xl mx-auto">
        <div className="w-24 h-24 relative mx-auto mb-6">
          <Image
            src="/images/brand/golden-mandala.png"
            alt={t("mandalaAlt")}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        <Typography variant="headline-medium" className="mb-4 font-display text-white">
          {t("headline")}
        </Typography>

        <Typography variant="body-large" className="mb-8 text-white/70">
          {t("description")}
        </Typography>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Button variant="filled" size="lg" className="min-w-[200px]" asChild>
            <Link href="/mua-hang">{t("subscribe")}</Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-[#C5A55A]/20">
          <Typography variant="label-large" className="text-white/60">
            {t("orExplore")}
          </Typography>
          <Button variant="text" className="text-[#C5A55A]" asChild>
            <Link href="/san-pham">{t("collection")}</Link>
          </Button>
          <span className="text-[#C5A55A]/30 hidden sm:inline">|</span>
          <Button variant="text" className="text-[#C5A55A]" asChild>
            <Link href="/khoa-hoc">{t("franchise")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
