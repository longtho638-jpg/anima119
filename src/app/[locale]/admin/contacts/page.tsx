import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
      const t = await getTranslations({ locale, namespace: "Admin.Contacts" });

    const supabase = await createClient();
    const { data: messages } = await supabase
        .from("contact_messages")
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
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                                <th className="p-4 font-medium">{t("columns.name")}</th>
                                <th className="p-4 font-medium">{t("columns.subject")}</th>
                                <th className="p-4 font-medium">Nội dung</th>
                                <th className="p-4 font-medium">{t("columns.date")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {messages && messages.length > 0 ? (
                                messages.map((m) => (
                                    <tr key={m.id} className="hover:bg-surface-container-lowest transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium text-on-surface">{m.name}</div>
                                            <div className="text-sm text-on-surface-variant font-mono">{m.phone || m.email}</div>
                                        </td>
                                        <td className="p-4 text-on-surface-variant capitalize">{m.subject}</td>
                                        <td className="p-4">
                                            <div className="text-sm text-on-surface line-clamp-2 max-w-sm">{m.message}</div>
                                        </td>
                                        <td className="p-4 text-on-surface-variant text-sm whitespace-nowrap">
                                            {formatDate(m.created_at)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                                        Chưa có tin nhắn nào
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
