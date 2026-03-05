"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-20 md:py-32 relative overflow-hidden flex items-center justify-center bg-[#0A1628]">
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

        <h2 className="mb-4 font-display text-4xl md:text-5xl font-bold text-white leading-tight">
          {t("headline")}
        </h2>

        <p className="mb-8 text-base md:text-lg text-white/70 max-w-xl mx-auto px-4">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 w-full px-4">
          <Button variant="filled" size="lg" className="w-full sm:w-auto min-w-[200px] active:scale-95 transition-transform" asChild>
            <Link href="/mua-hang">{t("subscribe")}</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center items-center pt-8 border-t border-[#C5A55A]/20">
          <span className="text-white/60 text-xs md:text-sm w-full sm:w-auto mb-2 sm:mb-0">
            {t("orExplore")}
          </span>
          <Link href="/san-pham" className="text-[#C5A55A] text-sm md:text-base font-medium hover:underline">
            {t("collection")}
          </Link>
          <span className="text-[#C5A55A]/30">|</span>
          <Link href="/khoa-hoc" className="text-[#C5A55A] text-sm md:text-base font-medium hover:underline">
            {t("franchise")}
          </Link>
        </div>
      </div>
    </section>
  );
}
