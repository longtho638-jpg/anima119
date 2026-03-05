"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const pathname = usePathname();
    const t = useTranslations("Admin.nav");

    const navItems = [
        { href: "/admin", icon: "dashboard", label: t("dashboard") },
        { href: "/admin/orders", icon: "shopping_bag", label: t("orders") },
        { href: "/admin/products", icon: "inventory_2", label: t("products") },
        { href: "/admin/contacts", icon: "mail", label: t("contacts") },
        { href: "/admin/franchise", icon: "store", label: t("franchise") },
    ];

    return (
        <aside className="w-64 bg-surface-container border-r border-outline-variant h-screen sticky top-0 flex flex-col hidden md:flex">
            <div className="p-6">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="material-symbols-rounded text-on-primary text-xl">admin_panel_settings</span>
                    </div>
                    <span className="font-display font-semibold text-title-large text-on-surface">Admin</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    // Exact match for dashboard, prefix match for others
                    const isActive = item.href === "/admin"
                        ? pathname === "/vi/admin" || pathname === "/en/admin"
                        : pathname.includes(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                                isActive
                                    ? "bg-secondary-container text-on-secondary-container"
                                    : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
                            )}
                        >
                            <span className={cn("material-symbols-rounded", isActive && "fill-1")}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-outline-variant">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors font-medium"
                >
                    <span className="material-symbols-rounded">home</span>
                    {t("returnHome")}
                </Link>
            </div>
        </aside>
    );
}
