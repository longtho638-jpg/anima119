import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Admin.Products" });

    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <Typography variant="headline-medium" className="font-display text-on-surface">
                    {t("title")}
                </Typography>
                <Button variant="filled">
                    <span className="material-symbols-rounded mr-2 text-xl">add</span>
                    {t("add")}
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                                <th className="p-4 font-medium">{t("columns.product")}</th>
                                <th className="p-4 font-medium">{t("columns.price")}</th>
                                <th className="p-4 font-medium">Danh mục</th>
                                <th className="p-4 font-medium">{t("columns.stock")}</th>
                                <th className="p-4 font-medium">{t("columns.featured")}</th>
                                <th className="p-4 font-medium text-right">{t("columns.actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {products && products.length > 0 ? (
                                products.map((p) => (
                                    <tr key={p.id} className="hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-surface-variant rounded-lg flex-shrink-0 overflow-hidden">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-on-surface line-clamp-1">{p.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-on-surface">{p.price.toLocaleString('vi-VN')} ₫</td>
                                        <td className="p-4 text-on-surface-variant capitalize">{p.category}</td>
                                        <td className="p-4">
                                            {p.in_stock ? (
                                                <span className="text-success material-symbols-rounded">check_circle</span>
                                            ) : (
                                                <span className="text-error material-symbols-rounded">cancel</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {p.featured && <span className="text-warn material-symbols-rounded">star</span>}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                                                <span className="material-symbols-rounded">edit</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                                        Chưa có sản phẩm nào
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
