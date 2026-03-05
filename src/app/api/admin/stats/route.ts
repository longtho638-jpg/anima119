import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { limiter, getClientIP } from "@/lib/rate-limit";

// Admin RBAC verification helper
async function verifyAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    return profile?.role === 'admin';
}

export async function GET(request: NextRequest) {
    try {
        try {
            await limiter.check(30, getClientIP(request));
        } catch {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }

        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabase = await createClient();

        const [
            { count: productsCount },
            { count: ordersCount },
            { count: pendingCount },
            { data: revenueData }
        ] = await Promise.all([
            supabase.from("products").select("*", { count: "exact", head: true }),
            supabase.from("orders").select("*", { count: "exact", head: true }),
            supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
            supabase.from("orders").select("total").not("status", "eq", "cancelled")
        ]);

        const revenue = revenueData ? revenueData.reduce((sum, order) => sum + (order.total || 0), 0) : 0;

        return NextResponse.json({
            productsCount: productsCount || 0,
            ordersCount: ordersCount || 0,
            pendingCount: pendingCount || 0,
            revenue
        });
    } catch {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
