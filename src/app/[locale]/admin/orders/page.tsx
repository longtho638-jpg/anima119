import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Admin.Orders" });

    const supabase = await createClient();
    const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <Typography variant="headline-medium" className="font-display text-on-surface">
                    {t("title")}
                </Typography>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                                <th className="p-4 font-medium">{t("columns.code")}</th>
                                <th className="p-4 font-medium">{t("columns.customer")}</th>
                                <th className="p-4 font-medium">{t("columns.date")}</th>
                                <th className="p-4 font-medium">{t("columns.total")}</th>
                                <th className="p-4 font-medium">{t("columns.payment")}</th>
                                <th className="p-4 font-medium">{t("columns.status")}</th>
                                <th className="p-4 font-medium">{t("columns.actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {orders && orders.length > 0 ? (
                                orders.map((order) => {
                                    const info = order.guest_info as { name?: string; phone?: string } | null;
                                    return (
                                        <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                                            <td className="p-4 font-mono text-sm">#{order.order_code}</td>
                                            <td className="p-4">
                                                <div className="font-medium text-on-surface">{info?.name || "Khách"}</div>
                                                <div className="text-sm text-on-surface-variant font-mono">{info?.phone}</div>
                                            </td>
                                            <td className="p-4 text-on-surface-variant text-sm whitespace-nowrap">
                                                {formatDate(order.created_at)}
                                            </td>
                                            <td className="p-4 font-medium text-on-surface">{order.total.toLocaleString('vi-VN')} ₫</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.payment_status === 'paid' ? 'bg-success/10 text-success' :
                                                    order.payment_status === 'failed' ? 'bg-error/10 text-error' :
                                                        'bg-surface-variant text-on-surface-variant'
                                                    }`}>
                                                    {order.payment_status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-success/10 text-success' :
                                                    order.status === 'cancelled' ? 'bg-error/10 text-error' :
                                                        'bg-primary/10 text-primary'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-primary hover:text-primary/80 font-medium text-sm">
                                                    Cập nhật
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-on-surface-variant">
                                        Chưa có đơn hàng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
