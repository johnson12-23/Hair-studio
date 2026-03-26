import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-900/10 bg-gradient-to-b from-white/65 to-white/95">
      <div className="section-shell py-12 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="rounded-[1.8rem] border border-emerald-900/10 bg-gradient-to-br from-emerald-50/80 via-white to-[#f4e7d7]/70 p-6 shadow-[0_14px_35px_rgba(17,24,39,0.08)]">
            <p className="font-[var(--font-heading)] text-3xl font-semibold text-emerald-950 sm:text-4xl">
              Abena
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-[#9c5f66]">Hair Studio</p>
            <p className="mt-4 max-w-md rounded-2xl bg-white/75 px-4 py-3 text-sm leading-7 text-ink/75">
              Elevated hair care, polished styling, and a warm studio experience for women who want beauty with intention.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-emerald-900/10 bg-gradient-to-br from-emerald-50/70 to-white p-6 shadow-[0_14px_30px_rgba(17,24,39,0.07)]">
            <p className="font-semibold uppercase tracking-[0.25em] text-amber-700">Visit</p>
            <div className="mt-4 space-y-3 text-sm text-ink/80">
              <p className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2">
                <MapPin className="h-4 w-4 text-emerald-900" />
                Ojeine St, Accra
              </p>
              <p className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2">
                <Phone className="h-4 w-4 text-emerald-900" />
                +233 (0) 246 447 824
              </p>
              <p className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-2 break-all">
                <Mail className="h-4 w-4 text-emerald-900" />
                abenahairstudio@gmail.com
              </p>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#9c5f66]/20 bg-gradient-to-br from-[#f7e8e9]/65 via-white to-amber-50/80 p-6 shadow-[0_14px_30px_rgba(17,24,39,0.07)]">
            <p className="font-semibold uppercase tracking-[0.25em] text-[#9c5f66]">Explore</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link href="/services" className="rounded-full bg-white/90 px-4 py-2 text-emerald-900 transition hover:bg-emerald-100">
                Services
              </Link>
              <Link href="/gallery" className="rounded-full bg-white/90 px-4 py-2 text-emerald-900 transition hover:bg-emerald-100">
                Gallery
              </Link>
              <Link href="/booking" className="rounded-full bg-white/90 px-4 py-2 text-emerald-900 transition hover:bg-emerald-100">
                Book an Appointment
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-emerald-900 transition hover:bg-emerald-100">
                <Instagram className="h-4 w-4" />
                @abenahairstudio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
