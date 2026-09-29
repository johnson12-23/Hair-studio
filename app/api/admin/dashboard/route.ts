import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasValidAdminSession } from "@/lib/admin/session";

type MessageRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type BookingRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  notes?: string;
  created_at: string;
};

export async function GET(request: Request) {
  if (!hasValidAdminSession(request)) {
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json({ messages: [], bookings: [] });
    }

    const [{ data: messagesData, error: messagesError }, { data: bookingsData, error: bookingsError }] = await Promise.all([
      supabase
        .from("contact_messages")
        .select("id, name, email, message, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("bookings")
        .select("id, full_name, email, phone, service, preferred_date, notes, created_at")
        .order("created_at", { ascending: false })
    ]);

    if (messagesError || bookingsError) {
      return NextResponse.json(
        { message: "Failed to load dashboard data." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      messages: (messagesData ?? []) as MessageRow[],
      bookings: (bookingsData ?? []) as BookingRow[]
    });
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error while loading dashboard." },
      { status: 500 }
    );
  }
}
