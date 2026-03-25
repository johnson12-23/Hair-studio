"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scissors, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

// Add prefetch for critical navigation links
const criticalLinks = ["/", "/services", "/gallery", "/booking", "/contact"];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/85 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-900 to-emerald-700 text-white shadow-[0_10px_24px_rgba(6,78,59,0.25)]">
            <Scissors className="h-5 w-5" />
          </div>
          <div>
            <p className="font-[var(--font-heading)] text-2xl font-semibold leading-none text-emerald-950">
              Abena
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-amber-700">
              Hair Studio
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={criticalLinks.includes(link.href)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-emerald-50 hover:text-emerald-900",
                pathname === link.href ? "bg-emerald-900 text-white shadow-sm" : "text-emerald-950/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="ml-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-amber-600 hover:to-amber-700"
          >
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-900/10 bg-white/70 text-emerald-900 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-emerald-900/10 bg-white/95 md:hidden">
          <div className="section-shell flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={criticalLinks.includes(link.href)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  pathname === link.href ? "bg-emerald-50 text-emerald-900" : "text-emerald-950/85"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
