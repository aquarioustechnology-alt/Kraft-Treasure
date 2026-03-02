"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function BespokeSection() {
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
    <section ref={ref} id="bespoke" className="py-24 lg:py-36 px-6 lg:px-20">
      <div className="relative overflow-hidden bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Image */}
          <div
            className={`relative lg:col-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden transition-all duration-1000 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/images/artisan-portrait.jpg"
              alt="Master artisan from Arunachal Pradesh"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Content */}
          <div
            className={`lg:col-span-3 p-8 lg:p-16 xl:p-20 flex flex-col justify-center transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-6">
              Bespoke Commissions
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-6 text-balance">
              Your Vision,
              <br />
              Their Mastery
            </h2>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-8 max-w-lg">
              Work directly with our master artisans to commission one-of-a-kind
              pieces tailored to your vision. From bespoke textiles for
              haute-couture to sculptural installations for private residences,
              every commission begins with a personal consultation with our
              curatorial team.
            </p>

            {/* Process steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  desc: "A private session with our curator to define your vision",
                },
                {
                  step: "02",
                  title: "Artisan Match",
                  desc: "We pair you with the master best suited to your project",
                },
                {
                  step: "03",
                  title: "Creation",
                  desc: "Track progress with photo updates from the artisan's studio",
                },
              ].map((item) => (
                <div key={item.step}>
                  <p className="text-2xl font-serif text-primary mb-2">
                    {item.step}
                  </p>
                  <h3 className="text-sm font-sans text-foreground mb-1 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <button className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-gold-light transition-all duration-300">
                Begin Your Commission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
