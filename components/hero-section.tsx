"use client"

import { useEffect, useState } from "react"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const HERO_IMAGES = [
  "/images/homepage/1st image.png",
  "/images/homepage/2nd image.png",
  "/images/homepage/3rd image.png",
  "/images/homepage/4th image.png"
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  return (
    <section className="relative min-h-[90vh] md:h-screen w-full overflow-hidden bg-white">
      {/* Background split - Hidden on mobile, handled by section colors */}
      <div className="absolute inset-0 flex flex-col md:flex-row pointer-events-none">
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white" />
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#FFF4B3]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row h-full">
        {/* Left Section - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 lg:px-12 pt-36 pb-12 md:py-0 items-center md:items-start text-center md:text-left">
          <div className="max-w-xl w-full">
            {/* Overline - Color #C5AB7D */}
            <p
              className={`text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans mb-3 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{
                transitionDelay: "0.4s",
                color: "#C5AB7D"
              }}
            >
              Heritage Craftsmanship for the World
            </p>

            {/* Main heading - Font size adjusted for mobile/tablet */}
            <h2
              className={`text-4xl md:text-6xl lg:text-[70px] font-serif text-black leading-[1.05] tracking-tight mb-5 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "0.6s" }}
            >
              Where Ancient
              <br />
              <span style={{ color: "#C5AB7D" }}>Artistry</span> Meets
              <br />
              Modern Luxury
            </h2>

            {/* Subheading - Reduced gap */}
            <p
              className={`text-sm md:text-base lg:text-lg text-black/80 font-sans leading-relaxed max-w-xl mb-8 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "0.8s" }}
            >
              Museum-quality artifacts handcrafted by the tribal artisans of
              Arunachal Pradesh, curated for discerning collectors worldwide.
            </p>

            {/* CTA Buttons - Single line, smaller font, adjusted padding */}
            <div
              className={`flex flex-col sm:flex-row justify-center md:justify-start gap-4 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "1s" }}
            >
              <Link
                href="/#collections"
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 shadow-md whitespace-nowrap min-w-[180px]"
              >
                <span className="relative z-20">Explore Collections</span>
                <ArrowRight className="relative z-20 w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-[#E31E25] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
              </Link>

              <Link
                href="#bespoke"
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2 border border-black bg-transparent text-black px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-sans transition-all duration-500 shadow-sm whitespace-nowrap min-w-[180px]"
              >
                <span className="relative z-20 transition-colors duration-500 group-hover:text-white font-medium">Commission a Piece</span>
                <div className="absolute inset-0 bg-black -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Image Side - Carousel centered in its half */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center overflow-hidden min-h-[500px] md:min-h-screen">
          <div
            className={`relative w-full aspect-square max-w-[380px] lg:max-w-[460px] 2xl:max-w-[500px] transition-all duration-700 ease-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
              }`}
            style={{ transitionDelay: "0.5s" }}
          >
            {HERO_IMAGES.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              >
                <NextImage
                  src={src}
                  alt={`Handcrafted Artisan Piece ${index + 1}`}
                  fill
                  className="object-cover rounded-sm shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}

            <div className="absolute inset-0 border border-[#E31E25]/5 pointer-events-none z-20" />

            {/* Carousel Controls */}
            <div className="absolute bottom-6 right-6 flex gap-3 z-30">
              <button
                onClick={prevImage}
                className="p-3 bg-white/40 backdrop-blur-md text-black hover:bg-white transition-all duration-300 rounded-full border border-black/10 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="p-3 bg-white/40 backdrop-blur-md text-black hover:bg-white transition-all duration-300 rounded-full border border-black/10 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
