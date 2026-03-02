"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Smartphone,
  Shield,
  Truck,
} from "lucide-react"
import type { Product } from "@/lib/data"
import { formatPrice, convertPrice } from "@/lib/data"
import { cartStore } from "@/lib/store"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getSnapshot
  )

  const handleAddToCart = () => {
    cartStore.addItem(product.id)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const price = convertPrice(product.price, cart.currency)
  const formattedPrice = formatPrice(price, cart.currency)

  return (
    <div className="pt-24 lg:pt-28">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-20 mb-8">
        <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-sans">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="/#collections"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {product.collection}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image gallery */}
          <div className="relative">
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-card mb-4">
              <Image
                src={product.images[currentImage]}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.isLimited && (
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-sans">
                    {product.edition}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-20 overflow-hidden transition-all duration-300 ${
                    currentImage === index
                      ? "ring-1 ring-primary"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center lg:py-8">
            {/* Category */}
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans mb-3">
              {product.category} / {product.collection}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl font-serif text-primary mb-6">
              {formattedPrice}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Details */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground font-sans mb-4">
                Details
              </p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-muted-foreground font-sans"
                  >
                    <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-border">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-1">
                  Dimensions
                </p>
                <p className="text-sm text-foreground font-sans">
                  {product.dimensions}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-1">
                  Material
                </p>
                <p className="text-sm text-foreground font-sans">
                  {product.material}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-1">
                  Origin
                </p>
                <p className="text-sm text-foreground font-sans">
                  {product.origin}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-1">
                  Availability
                </p>
                <p className="text-sm text-foreground font-sans">
                  {product.inStock ? "In Stock" : "Made to Order"}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-800 text-foreground"
                    : "bg-primary text-primary-foreground hover:bg-gold-light"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>

              {/* AR Button */}
              <button className="flex items-center justify-center gap-2 px-6 py-4 border border-border text-foreground text-xs tracking-[0.2em] uppercase font-sans hover:border-primary hover:text-primary transition-all duration-300">
                <Smartphone className="w-4 h-4" />
                View in Your Space
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: "Authenticity Guaranteed" },
                { icon: Truck, label: "Worldwide Insured Shipping" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-xs text-muted-foreground font-sans"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artisan biography */}
      <div className="mt-24 lg:mt-36 px-6 lg:px-20" id="artisans">
        <div className="bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Portrait */}
            <div className="relative aspect-square lg:aspect-auto overflow-hidden">
              <Image
                src={product.artisan.portrait}
                alt={`Portrait of artisan ${product.artisan.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Bio content */}
            <div className="lg:col-span-2 p-8 lg:p-16 flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans mb-4">
                The Artisan
              </p>
              <h2 className="text-3xl lg:text-4xl font-serif text-foreground mb-2">
                {product.artisan.name}
              </h2>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-sans mb-6">
                {product.artisan.tribe} Tribe {"  \u2022  "}
                {product.artisan.village}
              </p>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                {product.artisan.bio}
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-serif text-primary">
                    {product.artisan.yearsOfExperience}+
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mt-1">
                    Years of Mastery
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-primary">
                    {product.artisan.tribe}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mt-1">
                    Tribal Heritage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 lg:mt-36 px-6 lg:px-20 pb-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-3">
                You May Also Appreciate
              </p>
              <h2 className="text-2xl lg:text-3xl font-serif text-foreground">
                From the Same Collection
              </h2>
            </div>
            <Link
              href="/#collections"
              className="hidden sm:flex items-center gap-2 text-primary text-xs tracking-[0.2em] uppercase font-sans group"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <Link
                href={`/product/${related.slug}`}
                key={related.id}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
                  <Image
                    src={related.image}
                    alt={related.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans mb-1">
                  {related.category}
                </p>
                <h3 className="text-base font-serif text-foreground group-hover:text-primary transition-colors">
                  {related.name}
                </h3>
                <p className="text-sm font-sans text-primary mt-1">
                  {formatPrice(
                    convertPrice(related.price, cart.currency),
                    cart.currency
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
