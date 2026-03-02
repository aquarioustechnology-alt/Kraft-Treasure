export interface Product {
  id: string
  name: string
  slug: string
  price: number
  currency: string
  image: string
  images: string[]
  category: string
  collection: string
  description: string
  details: string[]
  dimensions: string
  material: string
  origin: string
  artisan: Artisan
  inStock: boolean
  isLimited: boolean
  edition?: string
}

export interface Artisan {
  name: string
  tribe: string
  village: string
  portrait: string
  bio: string
  yearsOfExperience: number
}

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  slug: string
}

export interface CurrencyRate {
  code: string
  symbol: string
  rate: number
  name: string
}

export const currencies: CurrencyRate[] = [
  { code: "INR", symbol: "\u20B9", rate: 1, name: "Indian Rupee" },
  { code: "AED", symbol: "AED", rate: 0.044, name: "UAE Dirham" },
  { code: "GBP", symbol: "\u00A3", rate: 0.0095, name: "British Pound" },
  { code: "USD", symbol: "$", rate: 0.012, name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", rate: 0.011, name: "Euro" },
]

export const artisans: Artisan[] = [
  {
    name: "Tapi Mra",
    tribe: "Nyishi",
    village: "Sagalee, Papum Pare",
    portrait: "/images/artisan-portrait.jpg",
    bio: "A master weaver with over four decades of experience, Tapi Mra learned the sacred art of textile creation from her grandmother in the highlands of Papum Pare. Each piece she creates carries the ancestral patterns of the Nyishi tribe, stories woven into every thread. Her work has been exhibited at the National Museum of Modern Art and collected by discerning patrons across three continents.",
    yearsOfExperience: 42,
  },
  {
    name: "Abo Tani",
    tribe: "Apatani",
    village: "Ziro Valley, Lower Subansiri",
    portrait: "/images/artisan-portrait.jpg",
    bio: "Born into a lineage of renowned craftsmen in the UNESCO-nominated Ziro Valley, Abo Tani brings an extraordinary sensitivity to bamboo and cane work. His sculptural vessels bridge the divide between traditional utility and contemporary art, earning recognition from the Crafts Council of India.",
    yearsOfExperience: 35,
  },
  {
    name: "Moji Riba",
    tribe: "Galo",
    village: "Along, West Siang",
    portrait: "/images/artisan-portrait.jpg",
    bio: "Moji Riba is a celebrated mask carver whose work preserves the spiritual traditions of the Galo tribe. Each mask takes up to three months to complete, using traditional tools and locally sourced hardwoods. His pieces are held in private collections from Dubai to London.",
    yearsOfExperience: 28,
  },
]

export const products: Product[] = [
  {
    id: "p001",
    name: "Nyishi Heritage Shawl",
    slug: "nyishi-heritage-shawl",
    price: 185000,
    currency: "INR",
    image: "/images/product-shawl.jpg",
    images: ["/images/product-shawl.jpg", "/images/product-basket.jpg"],
    category: "Textiles",
    collection: "Sacred Weaves",
    description:
      "Hand-loomed over 45 days using traditional backstrap techniques, this ceremonial shawl features the ancestral geometric motifs of the Nyishi tribe. Dyed with natural indigo and turmeric extracts sourced from the forests of Papum Pare.",
    details: [
      "Hand-loomed on traditional backstrap loom",
      "Natural indigo and turmeric dyes",
      "Nyishi ancestral geometric patterns",
      "Certificate of Authenticity included",
      "Museum-grade preservation packaging",
    ],
    dimensions: "200cm x 80cm",
    material: "Handspun cotton, natural dyes",
    origin: "Sagalee, Papum Pare District",
    artisan: artisans[0],
    inStock: true,
    isLimited: true,
    edition: "Limited Edition \u2014 3 of 12",
  },
  {
    id: "p002",
    name: "Ziro Valley Cane Vessel",
    slug: "ziro-valley-cane-vessel",
    price: 124000,
    currency: "INR",
    image: "/images/product-basket.jpg",
    images: ["/images/product-basket.jpg", "/images/product-shawl.jpg"],
    category: "Sculptural Objects",
    collection: "Woven Heritage",
    description:
      "A sculptural vessel handwoven from aged bamboo and wild cane by the master craftsmen of the Apatani tribe. Each piece is unique, reflecting the organic curves and natural imperfections that define true artisanship.",
    details: [
      "Handwoven from aged bamboo and wild cane",
      "Apatani tribal weaving technique",
      "Natural lacquer finish",
      "Each piece is one-of-a-kind",
      "Includes artisan-signed provenance card",
    ],
    dimensions: "38cm height x 26cm diameter",
    material: "Aged bamboo, wild cane, natural lacquer",
    origin: "Ziro Valley, Lower Subansiri District",
    artisan: artisans[1],
    inStock: true,
    isLimited: false,
  },
  {
    id: "p003",
    name: "Galo Spirit Mask",
    slug: "galo-spirit-mask",
    price: 275000,
    currency: "INR",
    image: "/images/product-mask.jpg",
    images: ["/images/product-mask.jpg", "/images/product-basket.jpg"],
    category: "Ceremonial Art",
    collection: "Spirit & Form",
    description:
      "Hand-carved from a single block of wild fig wood over a period of three months, this ceremonial mask represents the guardian spirits of the Galo tribe. The intricate detailing and natural patina speak to centuries of spiritual tradition.",
    details: [
      "Hand-carved from single block of wild fig wood",
      "Three-month creation process",
      "Traditional Galo spiritual motifs",
      "Natural beeswax and oil finish",
      "Includes custom display mount",
    ],
    dimensions: "42cm x 28cm x 15cm",
    material: "Wild fig wood, natural beeswax",
    origin: "Along, West Siang District",
    artisan: artisans[2],
    inStock: true,
    isLimited: true,
    edition: "Limited Edition \u2014 1 of 5",
  },
  {
    id: "p004",
    name: "Tribal Heirloom Necklace",
    slug: "tribal-heirloom-necklace",
    price: 345000,
    currency: "INR",
    image: "/images/product-necklace.jpg",
    images: ["/images/product-necklace.jpg", "/images/product-mask.jpg"],
    category: "Adornment",
    collection: "Sacred Weaves",
    description:
      "An extraordinary necklace assembled from antique brass trade beads, Himalayan turquoise, and hand-forged silver elements. This piece represents the convergence of trade routes that once connected Arunachal Pradesh to Tibet, Myanmar, and beyond.",
    details: [
      "Antique brass trade beads (estimated 80-120 years old)",
      "Natural Himalayan turquoise stones",
      "Hand-forged silver connectors",
      "Provenance documentation included",
      "Custom silk-lined presentation case",
    ],
    dimensions: "48cm length, adjustable",
    material: "Antique brass, turquoise, hand-forged silver",
    origin: "Tawang District",
    artisan: artisans[0],
    inStock: true,
    isLimited: true,
    edition: "Museum Piece \u2014 Unique",
  },
  {
    id: "p005",
    name: "Monpa Meditation Carpet",
    slug: "monpa-meditation-carpet",
    price: 420000,
    currency: "INR",
    image: "/images/product-carpet.jpg",
    images: ["/images/product-carpet.jpg", "/images/product-shawl.jpg"],
    category: "Textiles",
    collection: "Woven Heritage",
    description:
      "Handwoven by the Buddhist monks and artisans of the Monpa community in Tawang, this meditation carpet features sacred geometric patterns that have been passed down through twenty generations of master weavers.",
    details: [
      "Hand-knotted by Monpa community artisans",
      "Sacred Buddhist geometric patterns",
      "Natural highland wool, vegetable dyes",
      "600+ hours of handwork",
      "Comes with certificate from Tawang Monastery",
    ],
    dimensions: "180cm x 120cm",
    material: "Highland wool, vegetable dyes",
    origin: "Tawang District",
    artisan: artisans[1],
    inStock: true,
    isLimited: true,
    edition: "Limited Edition \u2014 2 of 8",
  },
  {
    id: "p006",
    name: "Apatani Ritual Vessel",
    slug: "apatani-ritual-vessel",
    price: 96000,
    currency: "INR",
    image: "/images/product-pottery.jpg",
    images: ["/images/product-pottery.jpg", "/images/product-basket.jpg"],
    category: "Sculptural Objects",
    collection: "Spirit & Form",
    description:
      "A hand-thrown ceramic vessel created using ancient Apatani firing techniques. The organic form and earth-toned glaze reflect the deep connection between the artisan and the land of Ziro Valley.",
    details: [
      "Hand-thrown using traditional techniques",
      "Local clay from Ziro Valley",
      "Wood-fired in traditional kiln",
      "Natural ash and mineral glaze",
      "Each piece uniquely formed",
    ],
    dimensions: "32cm height x 22cm diameter",
    material: "Local stoneware clay, natural glaze",
    origin: "Ziro Valley, Lower Subansiri District",
    artisan: artisans[1],
    inStock: true,
    isLimited: false,
  },
]

export const collections: Collection[] = [
  {
    id: "c001",
    name: "Sacred Weaves",
    description:
      "Ceremonial textiles carrying centuries of ancestral stories, handwoven using techniques preserved through twenty generations.",
    image: "/images/product-shawl.jpg",
    productCount: 12,
    slug: "sacred-weaves",
  },
  {
    id: "c002",
    name: "Woven Heritage",
    description:
      "Sculptural objects in bamboo and cane that blur the line between traditional craft and contemporary art.",
    image: "/images/product-basket.jpg",
    productCount: 8,
    slug: "woven-heritage",
  },
  {
    id: "c003",
    name: "Spirit & Form",
    description:
      "Ceremonial masks and ritual objects embodying the spiritual traditions of Arunachal Pradesh's diverse tribes.",
    image: "/images/product-mask.jpg",
    productCount: 6,
    slug: "spirit-and-form",
  },
]

export function convertPrice(
  priceInINR: number,
  targetCurrency: string
): number {
  const curr = currencies.find((c) => c.code === targetCurrency)
  if (!curr) return priceInINR
  return Math.round(priceInINR * curr.rate * 100) / 100
}

export function formatPrice(amount: number, currencyCode: string): string {
  const curr = currencies.find((c) => c.code === currencyCode)
  if (!curr) return `${amount}`

  if (currencyCode === "INR") {
    // Indian number formatting
    return `${curr.symbol}${amount.toLocaleString("en-IN")}`
  }
  return `${curr.symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: currencyCode === "GBP" || currencyCode === "EUR" || currencyCode === "USD" ? 2 : 0 })}`
}

export function calculateDuty(
  priceInINR: number,
  currencyCode: string
): { duty: number; tax: number; total: number } {
  const converted = convertPrice(priceInINR, currencyCode)
  let dutyRate = 0
  let taxRate = 0

  switch (currencyCode) {
    case "AED":
      dutyRate = 0.05
      taxRate = 0.05
      break
    case "GBP":
      dutyRate = 0.025
      taxRate = 0.2
      break
    case "USD":
      dutyRate = 0.03
      taxRate = 0.08
      break
    case "EUR":
      dutyRate = 0.025
      taxRate = 0.19
      break
    default:
      dutyRate = 0
      taxRate = 0.18 // GST
  }

  const duty = Math.round(converted * dutyRate * 100) / 100
  const tax = Math.round(converted * taxRate * 100) / 100
  const total = Math.round((converted + duty + tax) * 100) / 100

  return { duty, tax, total }
}
