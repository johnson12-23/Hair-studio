import Image from "next/image";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { galleryImages } from "@/lib/data";

export default function GalleryPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <section className="section-shell pt-8 sm:pt-10 lg:pt-12">
        <div
          className="relative flex min-h-[52vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/40 bg-cover bg-center bg-no-repeat text-center text-white shadow-[0_24px_70px_rgba(17,24,39,0.2)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.25)), url('/gallery/WhatsApp Image 2026-03-22 at 2.55.40 PM (1).jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-transparent to-black/35" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-amber-100">Style Showcase</p>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-semibold leading-tight sm:text-5xl">
              Finished Looks with Texture, Shape, and Shine
            </h1>
          </div>
        </div>
      </section>

      <section className="pt-12 sm:pt-16">
        <div className="section-shell space-y-12">
          <SectionHeading
            eyebrow="Style gallery"
            title="Looks that show our range, texture sensitivity, and polished finish work."
            description="Use this gallery to explore mood, finish, and shape before your next appointment."
            align="center"
          />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {galleryImages.map((image, index) => (
            <MotionReveal
              key={image.title}
              delay={index * 0.07}
              className={index % 5 === 0 ? "sm:col-span-2" : ""}
            >
              <article className="glass-card overflow-hidden p-3">
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={900}
                      height={900}
                      className={`w-full object-cover transition duration-700 hover:scale-105 ${
                        index % 5 === 0 ? "h-[20rem] sm:h-[25rem]" : "h-[20rem]"
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-full bg-gradient-to-br from-sand to-white/50 flex items-center justify-center text-rosewood font-semibold ${
                        index % 5 === 0 ? "h-[20rem] sm:h-[25rem]" : "h-[20rem]"
                      }`}
                    >
                      Image Placeholder
                    </div>
                  )}
                </div>
                <div className="px-2 pb-2 pt-4">
                  <p className="font-[var(--font-heading)] text-3xl font-semibold text-rosewood">
                    {image.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/60">{image.alt}</p>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}
