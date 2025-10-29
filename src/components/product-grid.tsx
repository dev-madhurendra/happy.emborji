import { useState, useMemo, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Link } from "react-router-dom"

type Product = {
  _id: string
  name: string
  price: number
  category: string
  tags: string[]
  image: string
  images?: string[]
}

type Props = {
  initialTab?: "all" | "crochet" | "embroidery"
  limit?: number
  categoryTag?: string
  showViewAll?: boolean
}

export function ProductGrid({ initialTab = "all", limit, categoryTag, showViewAll }: Props) {
  const [tab, setTab] = useState<"all" | "crochet" | "embroidery">(initialTab)
  const [q, setQ] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered = useMemo(() => {
    let list: Product[] = tab === "all" ? products : products.filter((p) => p.category === tab)
    if (categoryTag) list = list.filter((p) => p.tags?.includes(categoryTag))
    if (q.trim()) {
      const s = q.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.tags?.some((t) => t.includes(s)))
    }
    if (typeof limit === "number") return list.slice(0, limit)
    return list
  }, [tab, q, limit, categoryTag, products])

  if (loading) return <p className="text-center py-8 text-gray-500">Loading products...</p>

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="font-serif text-xl font-semibold">Products</h2>
        <div className="flex w-full gap-3 md:w-auto">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search keychain, bouquet, hoop..."
            className="w-full md:w-80"
            aria-label="Search products"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="crochet">Crochet</TabsTrigger>
          <TabsTrigger value="embroidery">Embroidery</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Grid products={filtered} />
        </TabsContent>
        <TabsContent value="crochet">
          <Grid products={filtered} />
        </TabsContent>
        <TabsContent value="embroidery">
          <Grid products={filtered} />
        </TabsContent>
      </Tabs>

      {showViewAll && (
        <div className="mt-6 text-center">
          <Button asChild variant="secondary">
            <Link to="/products">View all products</Link>
          </Button>
        </div>
      )}
    </section>
  )
}

function Grid({ products }: { products: Product[] }) {
  if (!products.length)
    return <p className="text-center text-gray-500 py-10">No products found.</p>

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  )
}
