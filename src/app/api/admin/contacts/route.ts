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
        const { data: contacts, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ contacts });
    } catch {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
