"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
    const t = useTranslations("Navigation");

    return (
        <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3">
            {/* Hotline Pulse Button */}
            <a
                href="tel:0988111222"
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#C5A55A] text-[#0A1628] shadow-elevation-3 transition-transform hover:scale-110 active:scale-95"
                aria-label="Hotline tư vấn"
            >
                <span className="absolute inset-0 rounded-full bg-[#C5A55A] opacity-50 animate-ping" />
                <span className="material-symbols-rounded text-3xl relative z-10 transition-transform group-hover:rotate-12">
                    call
                </span>
            </a>
        </div>
    );
}
