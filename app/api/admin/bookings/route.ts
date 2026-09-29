import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasValidAdminSession } from "@/lib/admin/session";

export async function GET(request: Request) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json({ bookings: [] });
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("id, full_name, email, phone, service, preferred_date, notes, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Failed to load bookings." },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data ?? [] });
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error while loading bookings." },
      { status: 500 }
    );
  }
}
