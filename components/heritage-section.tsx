"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function HeritageSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="heritage" className="relative py-24 lg:py-36">
      {/* Full-width image background */}
      <div className="relative mx-6 lg:mx-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div
            className={`relative aspect-square lg:aspect-auto lg:min-h-[600px] overflow-hidden transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <Image
              src="/images/heritage-landscape.jpg"
              alt="Misty mountains and valleys of Arunachal Pradesh"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40 lg:to-background" />
          </div>

          {/* Content side */}
          <div
            className={`bg-card p-8 lg:p-16 xl:p-20 flex flex-col justify-center transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-6">
              Global Heritage
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-8 text-balance">
              From the Himalayan
              <br />
              Foothills to the World
            </h2>
            <div className="space-y-5 text-sm text-muted-foreground font-sans leading-relaxed">
              <p>
                Nestled between the eastern Himalayas and the plains of Assam,
                Arunachal Pradesh is home to 26 major tribes and over 100
                sub-tribes, each carrying distinct artistic traditions that
                predate written history.
              </p>
              <p>
                Our curatorial team works directly with master artisans in
                remote villages accessible only by days of travel, ensuring each
                piece represents the highest expression of its tradition while
                providing fair-trade compensation that sustains entire
                communities.
              </p>
              <p>
                Every artifact comes with complete provenance documentation,
                artisan biography, and a certificate of authenticity verified by
                the Arunachal Pradesh State Museum.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              {[
                { value: "26+", label: "Tribal Communities" },
                { value: "180+", label: "Master Artisans" },
                { value: "12", label: "Countries Served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl lg:text-3xl font-serif text-primary">
                    {stat.value}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
