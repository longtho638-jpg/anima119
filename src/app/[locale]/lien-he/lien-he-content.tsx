"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MainLayout, FooterSection } from "@/components/layout";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function LienHeContent() {
  const t = useTranslations("LienHe");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: "business", label: t("company"), value: t("company") },
    { icon: "location_on", label: "Address", value: t("address") },
    { icon: "schedule", label: t("hours"), value: t("hoursValue") },
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

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Info */}
              <div className="space-y-8">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A55A]/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-rounded text-[#C5A55A] text-2xl">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <Typography variant="title-medium" className="text-on-surface font-bold mb-1">
                        {item.label}
                      </Typography>
                      <Typography variant="body-medium" className="text-on-surface-variant">
                        {item.value}
                      </Typography>
                    </div>
                  </div>
                ))}

                {/* Map Placeholder */}
                <div className="aspect-video rounded-2xl bg-[#1A2744] flex items-center justify-center border border-[#C5A55A]/20">
                  <div className="text-center">
                    <span className="material-symbols-rounded text-[#C5A55A] text-5xl mb-2 block">
                      map
                    </span>
                    <Typography variant="body-medium" className="text-white/60">
                      15/11 Duy Tan, Cau Giay, Hanoi
                    </Typography>
                    <a
                      href="https://maps.google.com/?q=15/11+Duy+Tan,+Cau+Giay,+Ha+Noi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C5A55A] text-sm mt-2 inline-block hover:underline"
                    >
                      Google Maps &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 rounded-2xl bg-surface-container border border-outline-variant">
                <Typography variant="headline-small" className="text-[#C5A55A] font-display mb-6">
                  {t("formTitle")}
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("formName")} *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("formPhone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("formEmail")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("formMessage")} *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="resize-none"
                    />
                  </div>
                  <Button type="submit" variant="filled" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t("formSubmitting") : t("formSubmit")}
                  </Button>
                  {status === "success" && (
                    <Typography variant="body-small" className="text-primary text-center block">
                      {t("formSuccess")}
                    </Typography>
                  )}
                  {status === "error" && (
                    <Typography variant="body-small" className="text-error text-center block">
                      {t("formError")}
                    </Typography>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </MainLayout>
    </div>
  );
}
