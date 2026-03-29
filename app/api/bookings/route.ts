import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isSmtpConfigured, sendEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = bookingSchema.parse(body);
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { error } = await supabase.from("bookings").insert({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        service: payload.service,
        preferred_date: payload.date,
        notes: payload.notes ?? null
      });

      if (error) {
        return NextResponse.json(
          { ok: false, message: "We could not save your booking right now." },
          { status: 500 }
        );
      }
    }

    if (isSmtpConfigured()) {
      const adminRecipient =
        process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || process.env.SMTP_USER?.trim();

      const emailResults = await Promise.allSettled([
        sendEmail({
          to: payload.email,
          subject: "Booking request received | Abena Hair Studio",
          text: `Hi ${payload.fullName},\n\nThank you for choosing Abena Hair Studio. We received your booking request and will confirm your appointment shortly.\n\nService: ${payload.service}\nPreferred date: ${payload.date}\nPhone: ${payload.phone}\n${payload.notes ? `Notes: ${payload.notes}\n` : ""}\nWarm regards,\nAbena Hair Studio Team`,
          replyTo: adminRecipient || undefined
        }),
        ...(adminRecipient
          ? [
              sendEmail({
                to: adminRecipient,
                subject: "New booking request received",
                text: `A new booking request was submitted.\n\nName: ${payload.fullName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.service}\nPreferred date: ${payload.date}\n${payload.notes ? `Notes: ${payload.notes}` : "Notes: -"}`,
                replyTo: payload.email
              })
            ]
          : [])
      ]);

      emailResults.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Booking email send failed [${index}]`, result.reason);
        }
      });
    }

    return NextResponse.json({
      ok: true,
      message: supabase
        ? "Booking request received. We’ll confirm your appointment shortly."
        : "Booking form is working. Add Supabase keys to store submissions."
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Please check your booking details and try again." },
      { status: 400 }
    );
  }
}
