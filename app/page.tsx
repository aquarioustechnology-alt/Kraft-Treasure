import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CollectionsSection } from "@/components/collections-section"
import { FeaturedProducts } from "@/components/featured-products"
import { HeritageSection } from "@/components/heritage-section"
import { BespokeSection } from "@/components/bespoke-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      <CollectionsSection />

      <FeaturedProducts />

      <HeritageSection />

      {/* Marquee ticker */}
      <div className="py-6 border-y border-border overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-sans mx-8"
            >
              Heritage Craftsmanship {"  \u2022  "} Museum Quality {"  \u2022  "} Fair Trade Certified {"  \u2022  "} Global Shipping {"  \u2022  "} Certificate of Authenticity {"  \u2022  "} Bespoke Commissions {"  \u2022  "}
            </span>
          ))}
        </div>
      </div>

      <BespokeSection />

      <SiteFooter />
    </main>
  )
}
