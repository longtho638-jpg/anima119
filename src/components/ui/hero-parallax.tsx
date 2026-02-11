"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const t = useTranslations("home.hero");

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background - Cosmic Navy */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="h-[120%] w-full bg-gradient-to-b from-[#0A1628] via-[#1A2744] to-[#0A1628]"
        >
          {/* Starfield dots */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #C5A55A, transparent),
              radial-gradient(1px 1px at 40px 70px, #fff, transparent),
              radial-gradient(1px 1px at 90px 40px, #C5A55A, transparent),
              radial-gradient(1px 1px at 130px 80px, #fff, transparent),
              radial-gradient(1px 1px at 160px 30px, #C5A55A, transparent)`,
            backgroundSize: "200px 100px",
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-surface" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full items-center justify-center px-4"
      >
        <div className="max-w-4xl text-center">
          {/* Golden mandala icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 flex justify-center"
          >
            <span className="material-symbols-rounded text-[#C5A55A] text-7xl" aria-hidden="true">self_improvement</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl font-bold text-white md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl text-[#C5A55A]/90 md:text-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/san-pham"
              className="rounded-full bg-[#C5A55A] px-8 py-4 text-lg font-medium text-[#0A1628] shadow-elevation-2 transition-all hover:shadow-elevation-4 hover:bg-[#D4B76A]"
            >
              {t("cta.primary")}
            </Link>
            <Link
              href="/nguon-goc"
              className="rounded-full border-2 border-[#C5A55A]/60 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-[#C5A55A]/10"
            >
              {t("cta.secondary")}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[#C5A55A]/80"
        >
          <span className="text-sm">{t("scroll")}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
