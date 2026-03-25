import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Gem, MapPin, Sparkles } from "lucide-react";
import { galleryImages, services, testimonials } from "@/lib/data";

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredGallery = galleryImages.filter((item) => item.src).slice(0, 4);

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[22rem] h-[18rem] w-[18rem] rounded-full bg-amber-200/35 blur-3xl" />

      <section className="section-shell pt-10 sm:pt-14 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:gap-10">
          <div className="rounded-[2rem] border border-emerald-900/10 bg-gradient-to-br from-white via-emerald-50/55 to-amber-50/75 p-6 shadow-[0_24px_60px_rgba(17,24,39,0.08)] sm:p-10 animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-emerald-800">
              <Sparkles size={14} />
              Signature Salon Experience
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl lg:text-6xl">
              Modern Hair Artistry with a Refined Luxury Feel.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-emerald-900/75 sm:text-lg">
              Welcome to Abena Hair Studio. We blend precision styling, healthy-hair care,
              and timeless beauty direction in a warm, premium space designed around you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Book Appointment
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/25 bg-white px-6 py-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-900/45"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: "Open", value: "Mon-Sat · 8am-7pm", icon: Clock3 },
                { label: "Location", value: "Osu, Accra", icon: MapPin },
                { label: "Style Focus", value: "Luxury Finishing", icon: Gem }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-emerald-900/10 bg-white/85 p-4"
                >
                  <item.icon size={16} className="text-amber-600" />
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-emerald-800/65">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {featuredGallery.slice(0, 2).map((image, index) => (
              <div
                key={image.title}
                className={`group relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-white shadow-[0_18px_45px_rgba(17,24,39,0.08)] ${
                  index === 0 ? "h-72" : "h-64"
                }`}
              >
                <Image
                  src={image.src as string}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-900/20 to-transparent" />
                <p className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-emerald-900 uppercase">
                  {image.title}
                </p>
              </div>
            ))}
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
