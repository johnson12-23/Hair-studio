import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasValidAdminSession } from "@/lib/admin/session";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json(
        { message: "Database is not configured." },
        { status: 500 }
      );
    }

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { message: "Failed to delete booking." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error while deleting booking." },
      { status: 500 }
    );
  }
}
