"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-artisan.jpg"
          alt="Artisan from Arunachal Pradesh handcrafting a traditional textile"
          fill
          className={`object-cover transition-transform duration-[2s] ${
            loaded ? "scale-100" : "scale-110"
          }`}
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-20">
        <div className="max-w-3xl">
          {/* Overline */}
          <p
            className={`text-xs tracking-[0.4em] uppercase text-primary font-sans mb-4 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            Heritage Craftsmanship for the World
          </p>

          {/* Main heading */}
          <h2
            className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-foreground leading-[1.05] mb-6 text-balance transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            Where Ancient
            <br />
            <span className="text-primary">Artistry</span> Meets
            <br />
            Modern Luxury
          </h2>

          {/* Subheading */}
          <p
            className={`text-base lg:text-lg text-muted-foreground font-sans leading-relaxed max-w-xl mb-10 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.7s" }}
          >
            Museum-quality artifacts handcrafted by the tribal artisans of
            Arunachal Pradesh, curated for discerning collectors worldwide.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.9s" }}
          >
            <Link
              href="/#collections"
              className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-gold-light transition-all duration-300"
            >
              Explore Collections
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
            </Link>
            <Link
              href="#bespoke"
              className="inline-flex items-center justify-center gap-3 border border-foreground/30 text-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:border-primary hover:text-primary transition-all duration-300"
            >
              Commission a Piece
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 right-6 lg:right-20 flex flex-col items-center gap-2 transition-all duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1.2s" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans rotate-90 origin-center mb-8">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  )
}
