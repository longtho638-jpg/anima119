"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { profile, isLoading } = useAuth();
    const router = useRouter();
    const t = useTranslations("Admin.guard");

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-on-surface-variant font-medium">{t("loading")}</p>
                </div>
            </div>
        );
    }

    if (!profile || profile.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface p-4">
                <div className="max-w-md w-full bg-surface-container rounded-3xl p-8 text-center shadow-elevation-1">
                    <span className="material-symbols-rounded text-5xl text-error mb-4">
                        admin_panel_settings
                    </span>
                    <h1 className="text-headline-medium text-on-surface font-display mb-2">
                        {t("accessDenied")}
                    </h1>
                    <p className="text-body-medium text-on-surface-variant mb-8">
                        {t("accessDeniedDesc")}
                    </p>
                    <div className="flex flex-col gap-3">
                        {!profile && (
                            <Button variant="filled" className="w-full" onClick={() => router.push("/?login=true")}>
                                {t("login")}
                            </Button>
                        )}
                        <Button variant={profile ? "filled" : "outlined"} className="w-full" onClick={() => router.push("/")}>
                            {t("goHome")}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
