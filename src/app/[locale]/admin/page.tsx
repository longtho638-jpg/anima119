import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { formatRelativeTime } from "@/lib/utils";

// This tells Next.js to not cache this page at build time
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Admin.Dashboard" });

    const supabase = await createClient();

    // Fetch stats in parallel
    const [
        { count: productsCount },
        { count: ordersCount, data: orders },
        { count: pendingCount },
        { data: revenueData }
    ] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total, created_at, status, order_code, payment_status, guest_info", { count: "exact" }).order('created_at', { ascending: false }).limit(10),
        supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("orders").select("total").not("status", "eq", "cancelled")
    ]);

    const revenue = revenueData ? revenueData.reduce((sum, order) => sum + (order.total || 0), 0) : 0;

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <Typography variant="headline-medium" className="font-display text-on-surface">
                    {t("title")}
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6 bg-primary-container text-on-primary-container border-none shadow-elevation-1">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="material-symbols-rounded text-3xl">shopping_bag</span>
                        <Typography variant="title-medium">{t("totalOrders")}</Typography>
                    </div>
                    <Typography variant="display-medium" className="font-display">
                        {ordersCount || 0}
                    </Typography>
                </Card>

                <Card className="p-6 bg-secondary-container text-on-secondary-container border-none shadow-elevation-1">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="material-symbols-rounded text-3xl">payments</span>
                        <Typography variant="title-medium">{t("revenue")}</Typography>
                    </div>
                    <Typography variant="display-medium" className="font-display">
                        {(revenue / 1000000).toFixed(1)}M
                    </Typography>
                    <Typography variant="label-small" className="opacity-80">VNĐ</Typography>
                </Card>

                <Card className="p-6 bg-tertiary-container text-on-tertiary-container border-none shadow-elevation-1">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="material-symbols-rounded text-3xl">pending_actions</span>
                        <Typography variant="title-medium">{t("pendingOrders")}</Typography>
                    </div>
                    <Typography variant="display-medium" className="font-display">
                        {pendingCount || 0}
                    </Typography>
                </Card>

                <Card className="p-6 bg-surface-container-highest text-on-surface border-none shadow-elevation-1">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="material-symbols-rounded text-3xl">inventory_2</span>
                        <Typography variant="title-medium">{t("totalProducts")}</Typography>
                    </div>
                    <Typography variant="display-medium" className="font-display">
                        {productsCount || 0}
                    </Typography>
                </Card>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                    <Typography variant="title-large" className="font-display text-on-surface">
                        {t("recentOrders")}
                    </Typography>
                </div>

                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                                    <th className="p-4 font-medium">Mã ĐH</th>
                                    <th className="p-4 font-medium">Khách hàng</th>
                                    <th className="p-4 font-medium">Thời gian</th>
                                    <th className="p-4 font-medium">Tổng tiền</th>
                                    <th className="p-4 font-medium">Thanh toán</th>
                                    <th className="p-4 font-medium">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                                {orders && orders.length > 0 ? (
                                    orders.map((order) => {
                                        const info = order.guest_info as { name?: string; phone?: string } | null;
                                        return (
                                            <tr key={order.order_code} className="hover:bg-surface-container-lowest transition-colors">
                                                <td className="p-4 font-mono text-sm">#{order.order_code}</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-on-surface">{info?.name || "Khách"}</div>
                                                    <div className="text-sm text-on-surface-variant font-mono">{info?.phone}</div>
                                                </td>
                                                <td className="p-4 text-on-surface-variant">{formatRelativeTime(order.created_at)}</td>
                                                <td className="p-4 font-medium text-on-surface">{order.total.toLocaleString('vi-VN')} ₫</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.payment_status === 'paid' ? 'bg-success/10 text-success' :
                                                        order.payment_status === 'failed' ? 'bg-error/10 text-error' :
                                                            'bg-surface-variant text-on-surface-variant'
                                                        }`}>
                                                        {order.payment_status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-success/10 text-success' :
                                                        order.status === 'cancelled' ? 'bg-error/10 text-error' :
                                                            'bg-primary/10 text-primary'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                                            Chưa có đơn hàng nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
