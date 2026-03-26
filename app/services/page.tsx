import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div
          className="relative flex min-h-[52vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/40 bg-cover bg-center bg-no-repeat text-center text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.22)), url('/gallery/WhatsApp Image 2026-03-22 at 2.55.42 PM (3).jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/25 via-transparent to-black/30" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-100">Salon Services</p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-semibold leading-tight sm:text-5xl">
              Signature Treatments Designed for Your Hair Story
            </h1>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-16">
        <div className="section-shell space-y-12">
          <SectionHeading
            eyebrow="Full service menu"
            title="Salon treatments that blend style, softness, and healthy-hair care."
            description="Every service includes a consultation and finish recommendations, so your look feels tailored from the first conversation."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <MotionReveal key={service.title} delay={index * 0.08}>
                <article className="glass-card p-7 sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rosewood text-white">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-rosewood sm:text-4xl">
                        {service.title}
                      </h2>
                    </div>
                    <div className="rounded-full bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
                      {service.price}
                    </div>
                  </div>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-ink/75">{service.description}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
