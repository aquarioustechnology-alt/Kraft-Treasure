import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { CheckoutContent } from "@/components/checkout-content"

export const metadata: Metadata = {
  title: "Checkout | Arunachal Luxe Artifacts",
  description: "Complete your purchase of museum-quality handcrafted artifacts.",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <CheckoutContent />
      <SiteFooter />
    </main>
  )
}
