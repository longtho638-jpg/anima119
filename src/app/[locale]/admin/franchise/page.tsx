import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminFranchisePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
      const t = await getTranslations({ locale, namespace: "Admin.Franchise" });

    const supabase = await createClient();
    const { data: applications } = await supabase
        .from("franchise_applications")
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
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                                <th className="p-4 font-medium">{t("columns.name")}</th>
                                <th className="p-4 font-medium">{t("columns.location")}</th>
                                <th className="p-4 font-medium">{t("columns.budget")}</th>
                                <th className="p-4 font-medium">{t("columns.date")}</th>
                                <th className="p-4 font-medium">{t("columns.status")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {applications && applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-on-surface">{app.full_name}</div>
                                            <div className="text-sm text-on-surface-variant font-mono">{app.phone}</div>
                                        </td>
                                        <td className="p-4 text-on-surface-variant">{app.location || "-"}</td>
                                        <td className="p-4 text-on-surface-variant">{app.investment_range || "-"}</td>
                                        <td className="p-4 text-on-surface-variant text-sm whitespace-nowrap">
                                            {formatDate(app.created_at)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === 'approved' ? 'bg-success/10 text-success' :
                                                    app.status === 'rejected' ? 'bg-error/10 text-error' :
                                                        app.status === 'reviewed' ? 'bg-primary/10 text-primary' :
                                                            'bg-surface-variant text-on-surface-variant'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                                        Chưa có đơn đăng ký nào
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
