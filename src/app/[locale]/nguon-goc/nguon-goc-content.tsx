"use client";

import { useTranslations } from "next-intl";
import { MainLayout, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

export default function NguonGocContent() {
  const t = useTranslations("NguonGoc");

  const certItems = [
    { key: "fssc", icon: "verified" },
    { key: "gmp", icon: "workspace_premium" },
    { key: "research", icon: "science" },
    { key: "award", icon: "emoji_events" },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainLayout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[#0A1628] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#C5A55A]/5 to-transparent" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
              {t("label")}
            </Typography>
            <Typography variant="display-medium" className="text-white font-display mb-6">
              {t("headline")}
            </Typography>
          </div>
        </section>

        {/* Heritage */}
        <section className="py-20 bg-surface">
          <div className="container mx-auto px-6">
            <MotionWrapper>
              <div className="max-w-3xl mx-auto text-center">
                <span className="material-symbols-rounded text-[#C5A55A] text-6xl mb-6 block">
                  history_edu
                </span>
                <Typography variant="headline-large" className="text-on-surface font-display mb-6">
                  {t("heritage.title")}
                </Typography>
                <Typography variant="body-large" className="text-on-surface-variant leading-relaxed">
                  {t("heritage.desc")}
                </Typography>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Dr. Uh Journey */}
        <section className="py-20 bg-[#0A1628]">
          <div className="container mx-auto px-6">
            <MotionWrapper>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-square rounded-2xl bg-[#1A2744] flex items-center justify-center border border-[#C5A55A]/20">
                  <span className="material-symbols-rounded text-[#C5A55A] text-8xl">
                    person
                  </span>
                </div>
                <div>
                  <Typography variant="headline-large" className="text-[#C5A55A] font-display mb-6">
                    {t("drUhJourney.title")}
                  </Typography>
                  <Typography variant="body-large" className="text-white/70 leading-relaxed">
                    {t("drUhJourney.desc")}
                  </Typography>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Distribution */}
        <section className="py-20 bg-surface">
          <div className="container mx-auto px-6">
            <MotionWrapper>
              <div className="max-w-3xl mx-auto text-center">
                <span className="material-symbols-rounded text-[#C5A55A] text-6xl mb-6 block">
                  local_shipping
                </span>
                <Typography variant="headline-large" className="text-on-surface font-display mb-4">
                  {t("distribution.title")}
                </Typography>
                <Typography variant="title-medium" className="text-[#C5A55A] mb-2">
                  {t("distribution.company")}
                </Typography>
                <Typography variant="body-medium" className="text-on-surface-variant mb-6">
                  {t("distribution.address")}
                </Typography>
                <Typography variant="body-large" className="text-on-surface-variant leading-relaxed">
                  {t("distribution.desc")}
                </Typography>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-surface-container-low">
          <div className="container mx-auto px-6">
            <Typography variant="headline-large" className="text-on-surface font-display text-center mb-12">
              {t("certifications.title")}
            </Typography>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certItems.map((cert, i) => (
                <MotionWrapper key={cert.key} delay={i * 0.1}>
                  <div className="p-6 rounded-xl bg-surface border border-outline-variant text-center">
                    <span className="material-symbols-rounded text-[#C5A55A] text-4xl mb-4 block">
                      {cert.icon}
                    </span>
                    <Typography variant="body-medium" className="text-on-surface-variant">
                      {t(`certifications.items.${cert.key}`)}
                    </Typography>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </MainLayout>
    </div>
  );
}
