"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

export function FeaturedProducts() {
  const t = useTranslations("Featured");

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
            {t("label")}
          </Typography>
          <Typography variant="headline-large" className="text-on-surface font-display mb-4">
            {t("headline")}
          </Typography>
          <Typography variant="body-large" className="text-on-surface-variant">
            {t("description")}
          </Typography>
        </div>

        <MotionWrapper delay={0.1}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="aspect-square rounded-2xl bg-[#1A2744] flex items-center justify-center border border-[#C5A55A]/20">
              <div className="text-center">
                <span className="material-symbols-rounded text-[#C5A55A] text-8xl">medication</span>
                <Typography variant="title-large" className="text-[#C5A55A] mt-4 font-display">
                  ANIMA 119
                </Typography>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <Typography variant="headline-medium" className="text-on-surface font-display">
                ANIMA 119
              </Typography>
              <Typography variant="body-large" className="text-on-surface-variant">
                {t("description")}
              </Typography>
              <Typography variant="headline-large" className="text-[#C5A55A] font-display">
                990,000 VND
              </Typography>
              <div className="flex gap-4">
                <Button variant="filled" size="lg" asChild>
                  <Link href="/san-pham">{t("viewAll")}</Link>
                </Button>
                <Button variant="outlined" size="lg" asChild>
                  <Link href="/mua-hang">Mua Ngay</Link>
                </Button>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
