"use client"

import { useSyncExternalStore, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, Lock, CreditCard, ShieldCheck } from "lucide-react"
import { cartStore } from "@/lib/store"
import {
  products,
  currencies,
  formatPrice,
  convertPrice,
  calculateDuty,
} from "@/lib/data"

export function CheckoutContent() {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getSnapshot
  )
  const [step, setStep] = useState<"bag" | "shipping" | "payment">("bag")

  const cartItems = cart.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return { ...item, product }
  }).filter((item) => item.product)

  const subtotal = cartItems.reduce((sum, item) => {
    if (!item.product) return sum
    return sum + convertPrice(item.product.price, cart.currency) * item.quantity
  }, 0)

  const totalINR = cartItems.reduce((sum, item) => {
    if (!item.product) return sum
    return sum + item.product.price * item.quantity
  }, 0)

  const { duty, tax, total } = calculateDuty(totalINR, cart.currency)

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 lg:px-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary font-sans mb-4">
          Your Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
          Your Bag is Empty
        </h1>
        <p className="text-sm text-muted-foreground font-sans mb-8 max-w-md">
          Discover our curated collection of museum-quality artifacts
          handcrafted by the tribal artisans of Arunachal Pradesh.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-gold-light transition-all duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue Exploring
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-28 lg:pt-32 pb-24 px-6 lg:px-20">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground text-xs tracking-[0.15em] uppercase font-sans hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
          Checkout
        </h1>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-4 mb-12">
        {(["bag", "shipping", "payment"] as const).map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className="flex items-center gap-3"
          >
            <span
              className={`w-8 h-8 flex items-center justify-center text-xs font-sans transition-colors ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-xs tracking-[0.15em] uppercase font-sans hidden sm:block ${
                step === s ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s === "bag" ? "Your Bag" : s === "shipping" ? "Shipping" : "Payment"}
            </span>
            {i < 2 && (
              <div className="w-12 lg:w-24 h-px bg-border hidden sm:block" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Main content */}
        <div className="lg:col-span-2">
          {step === "bag" && (
            <div className="space-y-6">
              {/* Currency toggle */}
              <div className="flex items-center gap-2 mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans mr-2">
                  Currency
                </p>
                <div className="flex border border-border">
                  {currencies.slice(0, 4).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => cartStore.setCurrency(c.code)}
                      className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-sans transition-all ${
                        cart.currency === c.code
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart items */}
              {cartItems.map((item) => {
                if (!item.product) return null
                const itemPrice = convertPrice(item.product.price, cart.currency)

                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 lg:gap-6 pb-6 border-b border-border"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="relative w-24 h-32 lg:w-32 lg:h-40 shrink-0 overflow-hidden bg-card"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans mb-1">
                          {item.product.category}
                        </p>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-base font-serif text-foreground hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {item.product.isLimited && (
                          <p className="text-[10px] text-muted-foreground font-sans mt-1">
                            {item.product.edition}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              cartStore.updateQuantity(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 text-xs font-sans text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              cartStore.updateQuantity(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-sm font-serif text-primary">
                            {formatPrice(itemPrice * item.quantity, cart.currency)}
                          </p>
                          <button
                            onClick={() => cartStore.removeItem(item.productId)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {step === "shipping" && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-foreground mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "First Name", placeholder: "Enter first name" },
                  { label: "Last Name", placeholder: "Enter last name" },
                  { label: "Email", placeholder: "your@email.com", full: true },
                  { label: "Phone", placeholder: "+1 (000) 000-0000", full: true },
                  { label: "Address Line 1", placeholder: "Street address", full: true },
                  { label: "Address Line 2", placeholder: "Apt, suite, etc.", full: true },
                  { label: "City", placeholder: "City" },
                  { label: "State / Province", placeholder: "State" },
                  { label: "Postal Code", placeholder: "Postal code" },
                  { label: "Country", placeholder: "Country" },
                ].map((field) => (
                  <div
                    key={field.label}
                    className={field.full ? "sm:col-span-2" : ""}
                  >
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-foreground mb-6">
                Payment Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors pr-12"
                    />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="000"
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="Full name as displayed on card"
                    className="w-full bg-transparent border border-border px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-center gap-3 pt-4">
                <Lock className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground font-sans">
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-card p-6 lg:p-8">
            <h2 className="text-lg font-serif text-foreground mb-6">
              Order Summary
            </h2>

            {/* Currency badge */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans">
                Currency:
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-primary font-sans font-medium">
                {cart.currency} ({currencies.find((c) => c.code === cart.currency)?.symbol})
              </span>
            </div>

            {/* Items summary */}
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => {
                if (!item.product) return null
                return (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm font-sans"
                  >
                    <span className="text-muted-foreground truncate mr-2">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-foreground shrink-0">
                      {formatPrice(
                        convertPrice(item.product.price, cart.currency) *
                          item.quantity,
                        cart.currency
                      )}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Cost breakdown */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatPrice(subtotal, cart.currency)}
                </span>
              </div>
              {cart.currency !== "INR" && (
                <>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-foreground">
                      Import Duty
                    </span>
                    <span className="text-foreground">
                      {formatPrice(duty, cart.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-foreground">
                      Tax ({cart.currency === "GBP" ? "VAT" : cart.currency === "AED" ? "VAT" : "Sales Tax"})
                    </span>
                    <span className="text-foreground">
                      {formatPrice(tax, cart.currency)}
                    </span>
                  </div>
                </>
              )}
              {cart.currency === "INR" && (
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="text-foreground">
                    {formatPrice(tax, cart.currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted-foreground">
                  Insured Shipping
                </span>
                <span className="text-primary">Complimentary</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
              <span className="text-sm font-sans text-foreground uppercase tracking-wider">
                Total
              </span>
              <span className="text-xl font-serif text-primary">
                {formatPrice(total, cart.currency)}
              </span>
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                if (step === "bag") setStep("shipping")
                else if (step === "shipping") setStep("payment")
              }}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase font-sans hover:bg-gold-light transition-all duration-300"
            >
              {step === "bag"
                ? "Proceed to Shipping"
                : step === "shipping"
                ? "Continue to Payment"
                : "Place Order"}
            </button>

            {/* Trust */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <p className="text-[10px] text-muted-foreground font-sans tracking-wider">
                Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
