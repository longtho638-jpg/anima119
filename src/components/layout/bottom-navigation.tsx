"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const navItems = [
    { href: "/", label: t("home"), icon: "home" },
    { href: "/san-pham", label: t("products"), icon: "inventory_2" },
    { href: "/mua-hang", label: t("purchase"), icon: "shopping_cart" },
    { href: "/lien-he", label: t("contact"), icon: "mail" },
  ];

  return (
    <nav
      aria-label="Điều hướng chính"
      className={cn(
        "md:hidden fixed bottom-4 left-4 right-4 z-50",
        "glass border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        "pb-[env(safe-area-inset-bottom,16px)] rounded-3xl"
      )}
    >
      <div className="flex items-center justify-around h-[72px] px-2 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl min-w-[64px] h-[56px]",
                "transition-all duration-300 ease-out",
                isActive
                  ? "text-[#C5A55A]"
                  : "text-on-surface-variant/70 hover:text-on-surface-variant active:scale-95"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[#C5A55A]/10 rounded-2xl -z-10" />
              )}
              <span
                className={cn(
                  "material-symbols-rounded text-2xl transition-all",
                  isActive && "fill-1"
                )}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
