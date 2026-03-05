"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature {
    icon: string;
    title: string;
    description: string;
    href: string;
    status: "live" | "coming-soon";
    tier: "A" | "B" | "C";
}

export function FeatureShowcase() {
    const t = useTranslations("Navigation");

    const features: Feature[] = [
        // === LIVE Features (Gói A) ===
        {
            icon: "storefront",
            title: "Cửa hàng trực tuyến",
            description: "Danh mục sản phẩm, bộ lọc, sắp xếp giá, hình ảnh HD",
            href: "/san-pham",
            status: "live",
            tier: "A",
        },
        {
            icon: "shopping_cart",
            title: "Giỏ hàng & Thanh toán",
            description: "Cart drawer, checkout PayOS VietQR, xác nhận đơn hàng",
            href: "/mua-hang",
            status: "live",
            tier: "A",
        },
        {
            icon: "mail",
            title: "Liên hệ & Hotline",
            description: "Form liên hệ, bản đồ, Zalo, Facebook Messenger",
            href: "/lien-he",
            status: "live",
            tier: "A",
        },
        {
            icon: "admin_panel_settings",
            title: "Admin Dashboard",
            description: "Quản lý đơn hàng, sản phẩm, thống kê doanh thu",
            href: "/admin",
            status: "live",
            tier: "A",
        },
        {
            icon: "translate",
            title: "Song ngữ Việt-Anh",
            description: "900+ translation keys, chuyển đổi ngôn ngữ mượt mà",
            href: "/",
            status: "live",
            tier: "A",
        },
        {
            icon: "security",
            title: "Bảo mật Enterprise",
            description: "CSP + HSTS + Rate Limit + Zod validation + RLS",
            href: "/",
            status: "live",
            tier: "A",
        },

        // === COMING SOON Features (Gói B/C) ===
        {
            icon: "science",
            title: "Khoa Học & Nghiên Cứu",
            description: "TS. Uh, Lên men bậc 4, kết quả RCT lâm sàng",
            href: "/khoa-hoc",
            status: "coming-soon",
            tier: "B",
        },
        {
            icon: "history_edu",
            title: "Nguồn Gốc & Di Sản",
            description: "Câu chuyện thương hiệu, vùng nguyên liệu, quy trình sản xuất",
            href: "/nguon-goc",
            status: "coming-soon",
            tier: "B",
        },
        {
            icon: "newspaper",
            title: "Tin Tức & Blog",
            description: "Cập nhật sản phẩm mới, bài viết sức khỏe, review khách hàng",
            href: "/tin-tuc",
            status: "coming-soon",
            tier: "B",
        },
        {
            icon: "analytics",
            title: "SEO Audit & Analytics",
            description: "Google Analytics 4, Facebook Pixel, báo cáo SEO tự động",
            href: "/",
            status: "coming-soon",
            tier: "C",
        },
        {
            icon: "loyalty",
            title: "Loyalty Program",
            description: "Tích điểm, ưu đãi khách VIP, mã giảm giá tự động",
            href: "/",
            status: "coming-soon",
            tier: "C",
        },
        {
            icon: "store",
            title: "Franchise Automation",
            description: "Hệ thống quản lý đại lý, đơn nhượng quyền tự động",
            href: "/",
            status: "coming-soon",
            tier: "C",
        },
    ];

    const liveFeatures = features.filter((f) => f.status === "live");
    const comingSoonFeatures = features.filter((f) => f.status === "coming-soon");

    return (
        <section className="py-20 bg-surface-container">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Typography
                        variant="headline-small"
                        className="text-on-surface font-display mb-3"
                    >
                        Tất cả tính năng trong hệ thống
                    </Typography>
                    <Typography
                        variant="body-large"
                        className="text-on-surface-variant max-w-2xl mx-auto"
                    >
                        Gói Diamond Launch bao gồm toàn bộ tính năng bên dưới — từ cửa hàng đến franchise
                    </Typography>
                </div>

                {/* LIVE Features */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="inline-block w-3 h-3 rounded-full bg-tertiary animate-pulse" />
                        <Typography variant="title-medium" className="text-on-surface font-semibold">
                            Đang hoạt động
                        </Typography>
                        <span className="text-xs bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-medium">
                            {liveFeatures.length} tính năng
                        </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {liveFeatures.map((feature) => (
                            <Link key={feature.title} href={feature.href}>
                                <Card
                                    variant="elevated"
                                    className="h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-rounded text-on-primary-container text-2xl">
                                                    {feature.icon}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Typography
                                                        variant="title-small"
                                                        className="text-on-surface font-semibold"
                                                    >
                                                        {feature.title}
                                                    </Typography>
                                                    <span className="text-[10px] bg-tertiary text-on-tertiary px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider flex-shrink-0">
                                                        Live
                                                    </span>
                                                </div>
                                                <Typography
                                                    variant="body-small"
                                                    className="text-on-surface-variant"
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* COMING SOON Features */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="inline-block w-3 h-3 rounded-full bg-secondary" />
                        <Typography variant="title-medium" className="text-on-surface font-semibold">
                            Sắp ra mắt
                        </Typography>
                        <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-medium">
                            Gói B & C
                        </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {comingSoonFeatures.map((feature) => (
                            <div
                                key={feature.title}
                                onClick={() =>
                                    alert(
                                        `"${feature.title}" sẽ được kích hoạt trong ${feature.tier === "B" ? "Gói B (Managed Repo)" : "Gói C (Diamond Launch)"
                                        }. Liên hệ để nâng cấp!`
                                    )
                                }
                                className="cursor-pointer"
                            >
                                <Card
                                    variant="outlined"
                                    className={cn(
                                        "h-full transition-all duration-300 relative overflow-hidden",
                                        "hover:-translate-y-1 hover:shadow-md",
                                        "border-2 border-dashed border-outline-variant hover:border-secondary"
                                    )}
                                >
                                    {/* Subtle Coming Soon overlay */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <span
                                            className={cn(
                                                "text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider",
                                                feature.tier === "B"
                                                    ? "bg-secondary-container text-on-secondary-container"
                                                    : "bg-primary text-on-primary"
                                            )}
                                        >
                                            {feature.tier === "B" ? "Gói B" : "Gói C ★"}
                                        </span>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center flex-shrink-0 opacity-60">
                                                <span className="material-symbols-rounded text-on-surface-variant text-2xl">
                                                    {feature.icon}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0 pr-12">
                                                <Typography
                                                    variant="title-small"
                                                    className="text-on-surface font-semibold mb-1"
                                                >
                                                    {feature.title}
                                                </Typography>
                                                <Typography
                                                    variant="body-small"
                                                    className="text-on-surface-variant"
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Upgrade CTA */}
                    <div className="mt-10 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-outline-variant">
                        <Typography variant="title-medium" className="text-on-surface font-semibold mb-2">
                            Muốn kích hoạt tất cả tính năng?
                        </Typography>
                        <Typography variant="body-medium" className="text-on-surface-variant mb-4">
                            Gói Diamond Launch ($4,000) bao gồm toàn bộ 12 tính năng + 90 ngày bảo hành
                        </Typography>
                        <Link href="/lien-he">
                            <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg">
                                Liên hệ tư vấn ngay →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
