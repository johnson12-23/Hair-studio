import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuthProvider } from "@/lib/admin/auth-context";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Abena Hair Studio",
  description:
    "Responsive ladies salon website built with Next.js, Tailwind CSS, TypeScript, and Supabase-ready booking flows.",
  metadataBase: new URL("https://abenahairstudio.com"),
  robots: "index, follow",
  openGraph: {
    title: "Abena Hair Studio - Professional Hair Services in Accra",
    description: "Professional hair salon offering Frontal Pony, Wig Installation, Hair Cutting, Coloring, Treatments and more in Accra, Ghana",
    url: "https://abenahairstudio.com",
    siteName: "Abena Hair Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abena Hair Studio - Professional Hair Services"
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} font-[var(--font-body)]`}
      >
        <AuthProvider>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-soft-radial" />
            <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl animate-blob-a" />
            <div className="pointer-events-none absolute right-0 top-40 -z-10 h-64 w-64 rounded-full bg-amber-200/35 blur-3xl animate-blob-b" />
            <div className="pointer-events-none absolute left-1/3 top-[34rem] -z-10 h-60 w-60 rounded-full bg-emerald-100/35 blur-3xl animate-blob-c" />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
