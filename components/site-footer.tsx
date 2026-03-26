import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-900/10 bg-gradient-to-b from-white/65 to-white/95">
      <div className="section-shell py-7 sm:py-12">
        <div className="grid gap-3 sm:gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="rounded-2xl sm:rounded-[1.8rem] border border-emerald-900/10 bg-gradient-to-br from-emerald-50/80 via-white to-[#f4e7d7]/70 p-4 sm:p-6 shadow-[0_10px_24px_rgba(17,24,39,0.08)] sm:shadow-[0_14px_35px_rgba(17,24,39,0.08)]">
            <p className="font-[var(--font-heading)] text-2xl font-semibold text-emerald-950 sm:text-4xl">
              Abena
            </p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-[#9c5f66] sm:text-xs sm:tracking-[0.35em]">Hair Studio</p>
            <p className="mt-3 max-w-md rounded-xl sm:rounded-2xl bg-white/75 px-3 py-2.5 text-xs leading-6 text-ink/75 sm:mt-4 sm:px-4 sm:py-3 sm:text-sm sm:leading-7">
              Elevated hair care, polished styling, and a warm studio experience for women who want beauty with intention.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-[1.8rem] border border-emerald-900/10 bg-gradient-to-br from-emerald-50/70 to-white p-4 sm:p-6 shadow-[0_10px_24px_rgba(17,24,39,0.07)] sm:shadow-[0_14px_30px_rgba(17,24,39,0.07)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-amber-700 sm:text-sm sm:tracking-[0.25em]">Visit</p>
            <div className="mt-3 space-y-2 text-xs text-ink/80 sm:mt-4 sm:space-y-3 sm:text-sm">
              <p className="flex items-center gap-2.5 rounded-lg sm:rounded-xl bg-white/80 px-3 py-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-900 sm:h-4 sm:w-4" />
                Ojeine St, Accra
              </p>
              <p className="flex items-center gap-2.5 rounded-lg sm:rounded-xl bg-white/80 px-3 py-2">
                <Phone className="h-3.5 w-3.5 text-emerald-900 sm:h-4 sm:w-4" />
                +233 (0) 246 447 824
              </p>
              <p className="flex items-center gap-2.5 rounded-lg sm:rounded-xl bg-white/80 px-3 py-2 break-all">
                <Mail className="h-3.5 w-3.5 text-emerald-900 sm:h-4 sm:w-4" />
                abenahairstudio@gmail.com
              </p>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-[1.8rem] border border-[#9c5f66]/20 bg-gradient-to-br from-[#f7e8e9]/65 via-white to-amber-50/80 p-4 sm:p-6 shadow-[0_10px_24px_rgba(17,24,39,0.07)] sm:shadow-[0_14px_30px_rgba(17,24,39,0.07)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9c5f66] sm:text-sm sm:tracking-[0.25em]">Explore</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs sm:mt-4 sm:text-sm">
              <Link href="/services" className="rounded-full bg-white/90 px-3 py-1.5 text-emerald-900 transition hover:bg-emerald-100 sm:px-4 sm:py-2">
                Services
              </Link>
              <Link href="/gallery" className="rounded-full bg-white/90 px-3 py-1.5 text-emerald-900 transition hover:bg-emerald-100 sm:px-4 sm:py-2">
                Gallery
              </Link>
              <Link href="/booking" className="rounded-full bg-white/90 px-3 py-1.5 text-emerald-900 transition hover:bg-emerald-100 sm:px-4 sm:py-2">
                Book an Appointment
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-emerald-900 transition hover:bg-emerald-100 sm:gap-2 sm:px-4 sm:py-2">
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                @abenahairstudio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
