"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { collections } from "@/lib/data"

export function CollectionsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="collections" className="py-24 lg:py-36 px-6 lg:px-20">
      {/* Section header */}
      <div
        className={`mb-16 lg:mb-24 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-4">
          Curated Collections
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight text-balance">
            Three Worlds of
            <br />
            Artisanship
          </h2>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-md">
            Each collection represents a distinct tradition of craft, preserved
            through generations and reimagined for the contemporary connoisseur.
          </p>
        </div>
      </div>

      {/* Collection cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {collections.map((collection, index) => (
          <Link
            href={`/product/${collection.slug === "sacred-weaves" ? "nyishi-heritage-shawl" : collection.slug === "woven-heritage" ? "ziro-valley-cane-vessel" : "galo-spirit-mask"}`}
            key={collection.id}
            className={`group relative overflow-hidden transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-2">
                  {collection.productCount} Pieces
                </p>
                <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-xs tracking-[0.2em] uppercase font-sans">
                    Explore
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
