"use client";

import { useTranslations } from "next-intl";
import { MainLayout, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function SanPhamContent() {
  const t = useTranslations("SanPham");

  const benefits = [
    { icon: "favorite", text: t("benefit1") },
    { icon: "skeleton", text: t("benefit2") },
    { icon: "bolt", text: t("benefit3") },
    { icon: "health_and_safety", text: t("benefit4") },
  ];

  const certs = [t("cert1"), t("cert2"), t("cert3")];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainLayout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-surface-container-low">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Product Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl bg-[#1A2744] overflow-hidden border border-[#C5A55A]/20 relative">
                  <Image
                    src="/images/products/anima-119-box.png"
                    alt={t("productAlt")}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-[#1A2744] overflow-hidden border border-[#C5A55A]/20 relative">
                  <Image
                    src="/images/products/anima-119-sachet.png"
                    alt={t("sachetAlt")}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div>
                <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-2">
                  {t("label")}
                </Typography>
                <Typography variant="display-small" className="text-on-surface font-display mb-2">
                  {t("name")}
                </Typography>
                <Typography variant="body-large" className="text-on-surface-variant mb-6">
                  {t("tagline")}
                </Typography>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-rounded text-[#C5A55A]">public</span>
                    <Typography variant="body-medium">{t("madeIn")}</Typography>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-rounded text-[#C5A55A]">factory</span>
                    <Typography variant="body-medium">{t("manufacturer")}</Typography>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-rounded text-[#C5A55A]">package_2</span>
                    <Typography variant="body-medium">{t("servingSize")}</Typography>
                  </div>
                </div>

                <Typography variant="display-small" className="text-[#C5A55A] font-display mb-6">
                  {t("price")} {t("currency")}
                </Typography>

                <div className="flex gap-4">
                  <Button variant="filled" size="lg" asChild>
                    <Link href="/mua-hang">{t("buyNow")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="w-full aspect-[21/9] relative overflow-hidden">
          <Image
            src="/images/products/anima-119-banner.png"
            alt={t("bannerAlt")}
            fill
            className="object-cover"
            quality={90}
          />
        </section>

        {/* Benefits */}
        <section className="py-16 bg-[#0A1628]">
          <div className="container mx-auto px-6">
            <Typography variant="headline-medium" className="text-[#C5A55A] font-display text-center mb-12">
              {t("benefits")}
            </Typography>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-[#1A2744] border border-[#C5A55A]/10">
                  <span className="material-symbols-rounded text-4xl text-[#C5A55A] mb-4 block">
                    {b.icon}
                  </span>
                  <Typography variant="body-large" className="text-white">
                    {b.text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ingredients & Usage */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 rounded-2xl bg-surface-container border border-outline-variant">
                <Typography variant="headline-small" className="text-[#C5A55A] font-display mb-4">
                  {t("ingredients")}
                </Typography>
                <Typography variant="body-large" className="text-on-surface-variant">
                  {t("ingredientsDesc")}
                </Typography>
              </div>
              <div className="p-8 rounded-2xl bg-surface-container border border-outline-variant">
                <Typography variant="headline-small" className="text-[#C5A55A] font-display mb-4">
                  {t("usage")}
                </Typography>
                <Typography variant="body-large" className="text-on-surface-variant">
                  {t("usageDesc")}
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-surface-container-low">
          <div className="container mx-auto px-6 text-center">
            <Typography variant="headline-medium" className="text-on-surface font-display mb-8">
              {t("certifications")}
            </Typography>
            <div className="flex flex-wrap justify-center gap-6">
              {certs.map((cert, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-[#C5A55A]/10 border border-[#C5A55A]/30">
                  <Typography variant="label-large" className="text-[#C5A55A]">
                    {cert}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </MainLayout>
    </div>
  );
}
