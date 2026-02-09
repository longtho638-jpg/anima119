"use client";

import { useTranslations } from "next-intl";
import { MainLayout, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import Image from "next/image";

export default function TinTucContent() {
  const t = useTranslations("TinTuc");

  const articles = [
    { id: "1", image: "/images/brand/article-fermentation.png" },
    { id: "2", image: "/images/brand/article-research.png" },
    { id: "3", image: "/images/brand/article-wellness.png" },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainLayout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[#0A1628]">
          <div className="container mx-auto px-6 text-center">
            <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
              {t("label")}
            </Typography>
            <Typography variant="display-medium" className="text-white font-display mb-6">
              {t("headline")}
            </Typography>
          </div>
        </section>

        {/* Articles */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <MotionWrapper key={article.id} delay={i * 0.1}>
                  <article className="rounded-2xl overflow-hidden bg-surface-container border border-outline-variant hover:border-[#C5A55A]/30 transition-colors">
                    {/* Article Image */}
                    <div className="aspect-video bg-[#1A2744] relative overflow-hidden">
                      <Image
                        src={article.image}
                        alt={t(`articles.${article.id}.title`)}
                        fill
                        className="object-cover"
                        quality={80}
                      />
                    </div>
                    <div className="p-6">
                      <Typography variant="label-medium" className="text-[#C5A55A] mb-2 block">
                        {t(`articles.${article.id}.date`)}
                      </Typography>
                      <Typography variant="title-large" className="text-on-surface font-display mb-3">
                        {t(`articles.${article.id}.title`)}
                      </Typography>
                      <Typography variant="body-medium" className="text-on-surface-variant mb-4">
                        {t(`articles.${article.id}.summary`)}
                      </Typography>
                      <span className="text-[#C5A55A] font-medium text-sm inline-flex items-center gap-1 cursor-pointer hover:underline">
                        {t("readMore")}
                        <span className="material-symbols-rounded text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </article>
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
