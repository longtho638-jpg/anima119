"use client";

import { useTranslations } from "next-intl";
import { MainLayout, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import Image from "next/image";

export default function KhoaHocContent() {
  const t = useTranslations("KhoaHoc");

  const patents = [
    t("fermentation.patent1"),
    t("fermentation.patent2"),
    t("fermentation.patent3"),
    t("fermentation.patent4"),
  ];

  const evidenceItems = [
    { icon: "science", text: t("evidence.bioavailability") },
    { icon: "shield", text: t("evidence.toxicity") },
    { icon: "biotech", text: t("evidence.compounds") },
    { icon: "spa", text: t("evidence.antioxidant") },
    { icon: "immune", text: t("evidence.immune") },
    { icon: "gastroenterology", text: t("evidence.gut") },
    { icon: "healing", text: t("evidence.antiInflammatory") },
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

        {/* Dr. Uh Section */}
        <section className="py-20 bg-surface">
          <div className="container mx-auto px-6">
            <MotionWrapper>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-[3/4] rounded-2xl bg-[#1A2744] overflow-hidden border border-[#C5A55A]/20 relative">
                  <Image
                    src="/images/brand/dr-uh-portrait.png"
                    alt="Dr. Uh Bong-woo"
                    fill
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <div>
                  <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
                    {t("drUh.label")}
                  </Typography>
                  <Typography variant="headline-large" className="text-on-surface font-display mb-4">
                    {t("drUh.name")}
                  </Typography>
                  <Typography variant="title-medium" className="text-[#C5A55A] mb-6">
                    {t("drUh.title")}
                  </Typography>
                  <div className="space-y-3 text-on-surface-variant">
                    {[
                      t("drUh.university"),
                      t("drUh.experience"),
                      t("drUh.role"),
                      t("drUh.advisor"),
                      t("drUh.award"),
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="material-symbols-rounded text-[#C5A55A] mt-0.5 text-lg">
                          check_circle
                        </span>
                        <Typography variant="body-large">{item}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* Fermentation Technology */}
        <section className="py-20 bg-[#0A1628]">
          <div className="container mx-auto px-6">
            <MotionWrapper>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
                  {t("fermentation.label")}
                </Typography>
                <Typography variant="headline-large" className="text-white font-display mb-6">
                  {t("fermentation.title")}
                </Typography>
                <Typography variant="body-large" className="text-white/70">
                  {t("fermentation.desc")}
                </Typography>
              </div>
            </MotionWrapper>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {patents.map((patent, i) => (
                <MotionWrapper key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-xl bg-[#1A2744] border border-[#C5A55A]/20 text-center">
                    <span className="material-symbols-rounded text-[#C5A55A] text-3xl mb-3 block">
                      verified
                    </span>
                    <Typography variant="body-medium" className="text-white/80">
                      {patent}
                    </Typography>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Scientific Evidence */}
        <section className="py-20 bg-surface">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
                {t("evidence.label")}
              </Typography>
              <Typography variant="headline-large" className="text-on-surface font-display mb-6">
                {t("evidence.title")}
              </Typography>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {evidenceItems.map((item, i) => (
                <MotionWrapper key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-surface-container border border-outline-variant">
                    <span className="material-symbols-rounded text-[#C5A55A] text-2xl flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <Typography variant="body-large" className="text-on-surface-variant">
                      {item.text}
                    </Typography>
                  </div>
                </MotionWrapper>
              ))}
            </div>

            {/* RCT Highlight */}
            <div className="p-8 rounded-2xl bg-[#C5A55A]/10 border border-[#C5A55A]/30 text-center">
              <span className="material-symbols-rounded text-[#C5A55A] text-5xl mb-4 block">
                clinical_notes
              </span>
              <Typography variant="title-large" className="text-[#C5A55A] font-display">
                {t("evidence.rct")}
              </Typography>
            </div>
          </div>
        </section>

        {/* Fermentation Lab */}
        <section className="py-20 bg-surface-container-low">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#C5A55A]/20 relative">
                <Image
                  src="/images/brand/fermentation-lab.png"
                  alt="Fermentation Laboratory"
                  fill
                  className="object-cover"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Production */}
        <section className="py-20 bg-surface-container-low">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
              {t("production.label")}
            </Typography>
            <Typography variant="headline-large" className="text-on-surface font-display mb-8">
              {t("production.title")}
            </Typography>
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-surface border border-outline-variant">
                <Typography variant="body-large" className="text-on-surface-variant">
                  {t("production.insung")}
                </Typography>
              </div>
              <div className="p-6 rounded-xl bg-surface border border-outline-variant">
                <Typography variant="body-large" className="text-on-surface-variant">
                  {t("production.partnership")}
                </Typography>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </MainLayout>
    </div>
  );
}
