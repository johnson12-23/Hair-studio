import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

export default function ContactPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div
          className="relative flex min-h-[52vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/40 bg-cover bg-center bg-no-repeat text-center text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.24)), url('/gallery/salon photo space.jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/25 via-transparent to-black/30" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-100">Contact Studio</p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-semibold leading-tight sm:text-5xl">
              Let&apos;s Talk About Your Next Hair Look
            </h1>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Contact the studio"
              title="Reach out for appointments, collaborations, or bridal styling enquiries."
              description="Whether you’re planning your first visit or something special, we’d love to hear from you."
            />
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
