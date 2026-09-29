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
      return NextResponse.json({ messages: [] });
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .select("id, name, email, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "Failed to load messages." },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: data ?? [] });
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error while loading messages." },
      { status: 500 }
    );
  }
}
