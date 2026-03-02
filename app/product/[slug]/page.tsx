import { products } from "@/lib/data"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetail } from "@/components/product-detail"

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: "Not Found" }
  return {
    title: `${product.name} | Arunachal Luxe Artifacts`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Get related products (same collection, excluding current)
  const related = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductDetail product={product} relatedProducts={related} />
      <SiteFooter />
    </main>
  )
}
