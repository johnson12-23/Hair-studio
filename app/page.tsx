import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { services, testimonials } from "@/lib/data";

export default function HomePage() {
  const featuredServices = services.slice(0, 6);

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[22rem] h-[18rem] w-[18rem] rounded-full bg-amber-200/35 blur-3xl" />

      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div
          className="relative flex min-h-[82vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/40 bg-cover bg-center bg-no-repeat text-center text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)] sm:min-h-[88vh]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.25)), url('/gallery/after.jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-black/35" />

          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-amber-100 backdrop-blur-sm">
              <Sparkles size={14} />
              Signature Hairstyling
            </span>

            <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Hair Artistry That Frames Your Beauty.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-lg">
              From flawless installs to bold finishes, we create hairstyle looks designed for confidence,
              elegance, and everyday luxury.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                Book Appointment
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-white/55 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                View Hairstyle Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-12 sm:mt-16">
        <div className="rounded-[2rem] border border-emerald-900/10 bg-white/85 p-6 shadow-[0_20px_55px_rgba(17,24,39,0.08)] sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-emerald-950 sm:text-3xl">
              Signature Services
            </h2>
            <Link href="/services" className="text-sm font-semibold text-amber-700 hover:text-amber-800">
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <article
                key={service.title}
                className="rounded-3xl border border-emerald-900/10 bg-gradient-to-b from-white to-emerald-50/45 p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(17,24,39,0.09)]"
              >
                <service.icon size={20} className="text-amber-600" />
                <h3 className="mt-4 text-lg font-semibold text-emerald-950">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/75">
                  {service.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-emerald-900">{service.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-12 sm:mt-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[2rem] border border-emerald-900/10 bg-gradient-to-br from-emerald-900 to-emerald-800 p-7 text-white shadow-[0_24px_60px_rgba(5,46,35,0.28)] sm:p-10">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-200/90">
              The Studio Standard
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Tailored Styling. Premium Care. Lasting Confidence.
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-emerald-50/85 sm:text-base">
              Every appointment is designed as a complete beauty ritual, from consultation to
              final finish. We focus on precision techniques and elevated comfort.
            </p>
            <Link
              href="/booking"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-amber-50"
            >
              Reserve Your Session
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-amber-400/30 bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 p-7 shadow-[0_20px_52px_rgba(17,24,39,0.08)] sm:p-10">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-700">
              Client Love
            </p>
            <div className="mt-5 space-y-4">
              {testimonials.slice(0, 2).map((item) => (
                <blockquote
                  key={item.name}
                  className="rounded-2xl border border-emerald-900/10 bg-white/95 p-4"
                >
                  <p className="text-sm leading-relaxed text-emerald-900/85">“{item.quote}”</p>
                  <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                    {item.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
