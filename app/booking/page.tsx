import { Clock3, Sparkles } from "lucide-react";
import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";

export default function BookingPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div
          className="relative flex min-h-[52vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/40 bg-cover bg-center bg-no-repeat text-center text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.28)), url('/gallery/client smiles.jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/25 via-transparent to-black/35" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-100">Book Your Visit</p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-semibold leading-tight sm:text-5xl">
              Plan Your Appointment with Ease
            </h1>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-16">
        <div className="section-shell grid gap-10 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Reserve your visit"
              title="Tell us what you need and we’ll shape the perfect appointment."
              description="Submit your preferred service and date. The studio will confirm timing, prep guidance, and any personalized recommendations."
            />

          <div className="glass-card space-y-5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta text-white">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-[var(--font-heading)] text-3xl font-semibold text-rosewood">
                  Studio Hours
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink/75">
                  Monday to Saturday, 8:00 AM to 7:00 PM. Sunday appointments are available for bridal and event requests.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-olive text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-[var(--font-heading)] text-3xl font-semibold text-rosewood">
                  Before You Arrive
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink/75">
                  For color and treatment appointments, arrive with inspiration photos if you have them. We’ll handle the rest together.
                </p>
              </div>
            </div>
          </div>
          </div>

          <BookingForm />
        </div>
      </section>
    </div>
  );
}
