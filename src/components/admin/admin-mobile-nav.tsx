"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function AdminMobileNav() {
    const pathname = usePathname();
    const t = useTranslations("Admin.nav");

    const navItems = [
        { href: "/admin", icon: "dashboard", label: t("dashboard") },
        { href: "/admin/orders", icon: "shopping_bag", label: t("orders") },
        { href: "/admin/products", icon: "inventory_2", label: t("products") },
        { href: "/admin/contacts", icon: "mail", label: t("contacts") },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container border-t border-outline-variant z-50 pb-[env(safe-area-inset-bottom,0px)]">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = item.href === "/admin"
                        ? pathname === "/vi/admin" || pathname === "/en/admin"
                        : pathname.includes(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1",
                                isActive ? "text-primary" : "text-on-surface-variant"
                            )}
                        >
                            <span className={cn("material-symbols-rounded text-[24px]", isActive && "fill-1")}>
                                {item.icon}
                            </span>
                            <span className="text-[10px] font-medium leading-none">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
