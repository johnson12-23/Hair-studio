import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isSmtpConfigured, sendEmailWithRetry } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = contactSchema.parse(body);
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { error } = await supabase.from("contact_messages").insert({
        name: payload.name,
        email: payload.email,
        message: payload.message
      });

      if (error) {
        return NextResponse.json(
          { ok: false, message: "We could not save your message right now." },
          { status: 500 }
        );
      }
    }

    if (isSmtpConfigured()) {
      const adminRecipient =
        process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || process.env.SMTP_USER?.trim();

      const customerEmailResult = await sendEmailWithRetry({
        to: payload.email,
        subject: "We received your message | Abena Hair Studio",
        text: `Hi ${payload.name},\n\nThank you for contacting Abena Hair Studio. We received your message and our team will reply shortly.\n\nYour message:\n${payload.message}\n\nWarm regards,\nAbena Hair Studio Team`,
        replyTo: adminRecipient || undefined
      });

      if (!customerEmailResult.ok) {
        console.error("Contact customer email failed", {
          to: payload.email,
          reason: customerEmailResult.reason,
          attempts: customerEmailResult.attempts,
          error: customerEmailResult.error
        });

        return NextResponse.json(
          {
            ok: false,
            message:
              "Message saved, but confirmation email could not be delivered. Please verify your email address and submit again."
          },
          { status: 502 }
        );
      }

      console.info("Contact customer email delivered", {
        to: payload.email,
        accepted: customerEmailResult.accepted,
        rejected: customerEmailResult.rejected,
        attempts: customerEmailResult.attempts
      });

      if (adminRecipient) {
        const adminEmailResult = await sendEmailWithRetry({
          to: adminRecipient,
          subject: "New contact message received",
          text: `A new contact message was submitted.\n\nName: ${payload.name}\nEmail: ${payload.email}\nMessage:\n${payload.message}`,
          replyTo: payload.email
        });

        if (!adminEmailResult.ok) {
          console.error("Contact admin notification failed", {
            to: adminRecipient,
            reason: adminEmailResult.reason,
            attempts: adminEmailResult.attempts,
            error: adminEmailResult.error
          });
        }
      }
    }

    return NextResponse.json({
      ok: true,
      message: supabase
        ? "Message received. Our team will reply soon."
        : "Contact form is ready. Add Supabase keys to store messages."
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Please review your message and try again." },
      { status: 400 }
    );
  }
}
