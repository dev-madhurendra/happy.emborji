import { ProductGrid } from "../../components/product-grid"
import { Sparkles, Heart, Package, Star, TrendingUp } from "lucide-react"

export default function ProductsPage(
  { searchParams }: { searchParams?: { category?: string } }
): React.ReactElement {
  const tag = searchParams?.category
  console.log(tag);
  
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-pink-100/40 blur-3xl"></div>
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-8">
        {/* Trust Badges */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">5.0 Rating</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
            <span className="font-medium">500+ Happy Customers</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Package className="h-4 w-4 text-purple-500" />
            <span className="font-medium">Handcrafted</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Premium Handmade Collection</span>
          </div>

          <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">
            Discover Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Piece
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C60 4 140 4 198 10" stroke="url(#gradient3)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#db2777" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Each creation is thoughtfully handcrafted with premium materials. Filter between Crochet and Embroidery, or search for your dream piece.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="group rounded-2xl border-2 bg-background p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold">250+</p>
            <p className="text-sm text-muted-foreground">Unique Designs</p>
          </div>

          <div className="group rounded-2xl border-2 bg-background p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">Made with Love</p>
          </div>

          <div className="group rounded-2xl border-2 bg-background p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Star className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold">5.0</p>
            <p className="text-sm text-muted-foreground">Customer Rating</p>
          </div>

          <div className="group rounded-2xl border-2 bg-background p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <Package className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold">Fast</p>
            <p className="text-sm text-muted-foreground">Delivery</p>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 p-8 text-center shadow-2xl">
          <div className="absolute left-10 top-10 h-24 w-24 animate-pulse rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-2xl" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative">
            <Sparkles className="mx-auto mb-3 h-8 w-8 animate-pulse text-white" />
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              ✨ Limited Time Offer!
            </h2>
            <p className="mx-auto max-w-xl text-white/90">
              Order custom pieces this month and get <span className="font-bold">free premium packaging</span> + personalized note card!
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <ProductGrid initialTab="all" />

      {/* Why Choose Us Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              happy.embroji
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We're more than just a shop—we're artisans who pour love into every stitch
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-3xl border-2 bg-background p-8 transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Quality Craftsmanship</h3>
            <p className="leading-relaxed text-muted-foreground">
              Every piece is meticulously handcrafted with premium materials, ensuring lasting beauty and durability.
            </p>
          </div>

          <div className="group rounded-3xl border-2 bg-background p-8 transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Custom Creations</h3>
            <p className="leading-relaxed text-muted-foreground">
              Have a unique vision? We bring your ideas to life with personalized designs tailored just for you.
            </p>
          </div>

          <div className="group rounded-3xl border-2 bg-background p-8 transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Gift-Ready Packaging</h3>
            <p className="leading-relaxed text-muted-foreground">
              Each order arrives beautifully packaged, perfect for gifting or treating yourself to something special.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
