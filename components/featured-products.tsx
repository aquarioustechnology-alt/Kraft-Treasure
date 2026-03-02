"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products, formatPrice, convertPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"

export function FeaturedProducts() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)

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

  const featured = products.slice(0, 4)

  return (
    <section ref={ref} className="py-24 lg:py-36 px-6 lg:px-20">
      {/* Header */}
      <div
        className={`mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-4">
            Selected Works
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
            Curator&apos;s Choice
          </h2>
        </div>
        <Link
          href="/#collections"
          className="group flex items-center gap-3 text-primary text-xs tracking-[0.2em] uppercase font-sans"
        >
          View All Pieces
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {featured.map((product, index) => (
          <Link
            href={`/product/${product.slug}`}
            key={product.id}
            className={`group transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${0.15 + index * 0.1}s` }}
          >
            {/* Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-card">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.isLimited && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-[9px] tracking-[0.2em] uppercase font-sans">
                    Limited
                  </span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-xs tracking-[0.2em] uppercase text-foreground font-sans border border-foreground/40 px-6 py-3 backdrop-blur-sm">
                  View Details
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans mb-1">
                {product.category}
              </p>
              <h3 className="text-base font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm font-sans text-primary">
                {formatPrice(convertPrice(product.price, cart.currency), cart.currency)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
