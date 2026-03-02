"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 lg:px-20 py-16 lg:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">
              Arunachal
            </p>
            <p className="text-lg font-serif tracking-[0.15em] text-foreground">
              LUXE ARTIFACTS
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-sans leading-relaxed">
            Heritage craftsmanship from the tribal artisans of Arunachal
            Pradesh, curated for global collectors and connoisseurs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-6">
            Navigate
          </p>
          <ul className="space-y-3">
            {["Collections", "Heritage Story", "Our Artisans", "Bespoke Orders"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground font-sans hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-6">
            Client Services
          </p>
          <ul className="space-y-3">
            {[
              "Shipping & Delivery",
              "Returns & Authentication",
              "Care Instructions",
              "Corporate Gifting",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground font-sans hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-6">
            Concierge
          </p>
          <div className="space-y-3 text-sm text-muted-foreground font-sans">
            <p>concierge@arunachalluxe.com</p>
            <p>+91 360 221 4500</p>
            <p className="leading-relaxed">
              Itanagar, Arunachal Pradesh
              <br />
              India 791111
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
        <p className="text-[10px] text-muted-foreground tracking-wider font-sans">
          {"\u00A9"} 2026 Arunachal Luxe Artifacts. All rights reserved.
        </p>
        <div className="flex gap-6 text-[10px] text-muted-foreground tracking-wider font-sans">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Authenticity
          </Link>
        </div>
      </div>
    </footer>
  )
}
