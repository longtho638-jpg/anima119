import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
  
    return (
        <AdminGuard>
            <div className="min-h-screen bg-surface flex flex-col md:flex-row pb-16 md:pb-0">
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
                <AdminMobileNav />
            </div>
        </AdminGuard>
    );
}
