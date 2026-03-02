"use client"

import { useState, useSyncExternalStore, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cartStore } from "@/lib/store"
import { currencies } from "@/lib/data"

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs tracking-[0.2em] uppercase font-sans hidden sm:inline">
              Menu
            </span>
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">
                Arunachal
              </p>
              <h1 className="text-lg lg:text-xl font-serif tracking-[0.15em] text-foreground">
                LUXE ARTIFACTS
              </h1>
            </div>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Currency Selector */}
            <select
              value={cart.currency}
              onChange={(e) => cartStore.setCurrency(e.target.value)}
              className="bg-transparent text-xs tracking-[0.15em] uppercase text-foreground border-none outline-none cursor-pointer font-sans hidden sm:block"
              aria-label="Select currency"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code} className="bg-background text-foreground">
                  {c.code}
                </option>
              ))}
            </select>

            {/* Cart */}
            <Link
              href="/checkout"
              className="relative text-foreground hover:text-primary transition-colors"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-sans flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Bespoke CTA */}
            <Link
              href="#bespoke"
              className="hidden lg:flex items-center gap-2 px-5 py-2 border border-primary text-primary text-xs tracking-[0.2em] uppercase font-sans hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Bespoke Orders
            </Link>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-700 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-background/98 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col justify-center px-8 lg:px-20 transition-transform duration-700 ${
          menuOpen ? "translate-y-0" : "-translate-y-8"
        }`}>
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 left-6 lg:left-12 flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
            <span className="text-xs tracking-[0.2em] uppercase font-sans">
              Close
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2" aria-label="Main navigation">
            {[
              { label: "Home", href: "/" },
              { label: "Collections", href: "/#collections" },
              { label: "Heritage", href: "/#heritage" },
              { label: "Artisans", href: "/#artisans" },
              { label: "Bespoke Orders", href: "#bespoke" },
              { label: "Checkout", href: "/checkout" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-6"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="text-xs text-muted-foreground font-sans tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground hover:text-primary transition-colors duration-300 leading-tight">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom info */}
          <div className="absolute bottom-8 left-8 lg:left-20 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-sans mb-1">
                Inquiries
              </p>
              <p className="text-sm text-foreground font-sans">
                concierge@arunachalluxe.com
              </p>
            </div>
            <div className="flex gap-6">
              {/* Currency selector in menu for mobile */}
              <select
                value={cart.currency}
                onChange={(e) => cartStore.setCurrency(e.target.value)}
                className="sm:hidden bg-transparent text-xs tracking-[0.15em] uppercase text-foreground border border-border px-3 py-2 cursor-pointer font-sans"
                aria-label="Select currency"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code} className="bg-background text-foreground">
                    {c.code}
                  </option>
                ))}
              </select>
              <div className="flex gap-4 text-xs text-muted-foreground tracking-wider font-sans">
                <span>Instagram</span>
                <span>WeChat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
