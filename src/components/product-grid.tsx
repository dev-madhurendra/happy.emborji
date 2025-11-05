import { useState, useEffect, useMemo } from "react";
import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link } from "react-router-dom";
import {
  Search,
  Sparkles,
  TrendingUp,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { staticProducts } from "../data/products";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  tag: "embroidery" | "crochet";
  image: string;
  images?: string[];
};

type Props = {
  initialTab?: "all" | "crochet" | "embroidery";
  limit?: number;
  showViewAll?: boolean;
};

export function ProductGrid({
  initialTab = "all",
  limit = 6,
  showViewAll,
}: Props) {
  const [tab, setTab] = useState<"all" | "crochet" | "embroidery">(initialTab);
  const [q, setQ] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products?${params}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.products.length == 0) setProducts(staticProducts);
        else setProducts(data?.products);
        setTotalPages(
          data?.totalPages || Math.ceil(staticProducts.length / limit)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const filtered = useMemo(() => {
    let list: Product[] = products;

    if (tab !== "all") {
      const tabValue = tab.trim().toLowerCase();
      list = list.filter((p) => p.tag?.trim().toLowerCase() === tabValue);
    }

    return list;
  }, [tab, products]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></div>
            <Sparkles className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-pulse text-pink-600" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">
            Loading amazing products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for keychains, bouquets, hoops, or custom gifts..."
            className="h-14 border-2 pl-12 pr-4 text-base shadow-lg focus:shadow-xl focus:shadow-pink-500/20 transition-all"
            aria-label="Search products"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          className="space-y-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-2 bg-transparent p-0 sm:w-auto">
              <TabsTrigger
                value="all"
                className="group relative h-12 rounded-xl border-2 bg-background data-[state=active]:border-pink-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-50 data-[state=active]:to-purple-50 data-[state=active]:shadow-lg"
              >
                <Package className="mr-2 h-4 w-4" />
                <span className="font-semibold">All</span>
                {tab === "all" && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="crochet"
                className="group relative h-12 rounded-xl border-2 bg-background data-[state=active]:border-pink-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-50 data-[state=active]:to-purple-50 data-[state=active]:shadow-lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                <span className="font-semibold">Crochet</span>
                {tab === "crochet" && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="embroidery"
                className="group relative h-12 rounded-xl border-2 bg-background data-[state=active]:border-pink-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-50 data-[state=active]:to-purple-50 data-[state=active]:shadow-lg"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                <span className="font-semibold">Embroidery</span>
                {tab === "embroidery" && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
                )}
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 rounded-xl border bg-background/80 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">
                {products.length}{" "}
                {products.length === 1 ? "Product" : "Products"} Found
              </span>
            </div>
          </div>

          <TabsContent value={tab} className="mt-8">
            <Grid products={filtered} searchQuery={q} />
          </TabsContent>
        </Tabs>
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="group h-12 border-2 px-6 disabled:opacity-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="icon"
                    onClick={() => setPage(pageNum)}
                    className={`h-12 w-12 border-2 font-semibold ${
                      page === pageNum
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30"
                        : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="group h-12 border-2 px-6 disabled:opacity-50"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <span className="text-sm text-muted-foreground">
            Showing page{" "}
            <span className="font-semibold text-foreground">{page}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </span>
        </div>
      )}

      {showViewAll && (
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="group h-14 bg-gradient-to-r from-pink-600 to-purple-600 px-8 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40"
          >
            <Link to="/products" className="flex items-center gap-2">
              Explore All Products
              <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

function Grid({
  products,
  searchQuery,
}: {
  products: Product[];
  searchQuery: string;
}) {
  if (!products.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 rounded-3xl border-2 border-dashed bg-gradient-to-br from-pink-50/50 to-purple-50/50 p-12">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-purple-100">
            <Search className="h-12 w-12 text-pink-600" />
          </div>
          <Sparkles className="absolute -right-2 -top-2 h-8 w-8 text-amber-500" />
        </div>

        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold">No Products Found</h3>
          <p className="max-w-md text-muted-foreground">
            {searchQuery
              ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or browse all categories.`
              : "No products available in this category right now. Check back soon!"}
          </p>
        </div>

        {searchQuery && (
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
            className="border-2"
          >
            Clear Search & View All
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-muted-foreground">
          Showing {products.length} amazing{" "}
          {products.length === 1 ? "product" : "products"}
        </h3>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by:</span>
          <select className="rounded-lg border-2 bg-background px-3 py-2 font-medium outline-none focus:border-pink-500">
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, index) => (
          <div
            key={p._id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-100 via-purple-100 to-amber-100 p-8">
        <div className="grid gap-6 text-center md:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-pink-600">100%</p>
            <p className="text-sm text-muted-foreground">Handcrafted</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">500+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-600">5.0★</p>
            <p className="text-sm text-muted-foreground">Perfect Rating</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
