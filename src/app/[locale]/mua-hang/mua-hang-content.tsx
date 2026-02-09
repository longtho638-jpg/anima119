"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MainLayout, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function MuaHangContent() {
  const t = useTranslations("MuaHang");
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 990000;

  const guarantees = [
    { icon: "verified", text: t("guarantee") },
    { icon: "local_shipping", text: t("freeShip") },
    { icon: "autorenew", text: t("return") },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <MainLayout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-surface-container-low">
          <div className="container mx-auto px-6 text-center">
            <Typography variant="label-large" className="text-[#C5A55A] tracking-widest uppercase mb-4">
              {t("label")}
            </Typography>
            <Typography variant="display-medium" className="text-on-surface font-display mb-6">
              {t("headline")}
            </Typography>
          </div>
        </section>

        {/* Product Card */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="aspect-square rounded-2xl bg-[#1A2744] flex items-center justify-center border border-[#C5A55A]/20">
                <div className="text-center">
                  <span className="material-symbols-rounded text-[#C5A55A] text-8xl">
                    medication
                  </span>
                  <Typography variant="title-large" className="text-[#C5A55A] mt-4 font-display">
                    {t("productName")}
                  </Typography>
                </div>
              </div>

              {/* Order Form */}
              <div className="space-y-6">
                <div>
                  <Typography variant="headline-medium" className="text-on-surface font-display mb-2">
                    {t("productName")}
                  </Typography>
                  <Typography variant="body-large" className="text-on-surface-variant">
                    {t("productDesc")}
                  </Typography>
                </div>

                <Typography variant="headline-large" className="text-[#C5A55A] font-display">
                  {t("price")}
                </Typography>

                {/* Quantity */}
                <div>
                  <Typography variant="label-large" className="text-on-surface mb-2 block">
                    {t("quantity")}
                  </Typography>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      -
                    </button>
                    <Typography variant="title-large" className="text-on-surface w-12 text-center">
                      {quantity}
                    </Typography>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant">
                  <div className="flex justify-between items-center">
                    <Typography variant="title-medium" className="text-on-surface">
                      {t("total")}
                    </Typography>
                    <Typography variant="headline-medium" className="text-[#C5A55A] font-display">
                      {(unitPrice * quantity).toLocaleString("vi-VN")} VND
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="filled" size="lg" className="flex-1" asChild>
                    <Link href="/checkout">{t("checkout")}</Link>
                  </Button>
                </div>

                {/* Guarantees */}
                <div className="space-y-3 pt-4 border-t border-outline-variant">
                  {guarantees.map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="material-symbols-rounded text-[#C5A55A]">{g.icon}</span>
                      <Typography variant="body-medium" className="text-on-surface-variant">
                        {g.text}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </MainLayout>
    </div>
  );
}
