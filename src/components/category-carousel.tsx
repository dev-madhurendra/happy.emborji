import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { staticCategories } from "../data/categories";
import { Sparkles, ArrowRight } from "lucide-react";

type Category = {
  category: string;
  image: string;
  count?: number;
};

export function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-pink-500" style={{ animationDelay: '0ms' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '150ms' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-amber-500" style={{ animationDelay: '300ms' }}></div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-muted-foreground">No categories available</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium">Collections</span>
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
            Shop by{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
        </div>
        
        <Link
          to="/products"
          className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Carousel */}
      <Carousel 
        opts={{ 
          align: "start",
          loop: true,
        }} 
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categories.map((cat) => (
            <CarouselItem
              key={cat.category}
              className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Link
                to={{
                  pathname: "/products",
                  search: `?category=${encodeURIComponent(cat.category)}`,
                }}
                className="group flex flex-col items-center gap-3"
              >
                {/* Circular Image */}
                <div className="relative">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-transparent transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-xl group-hover:shadow-pink-500/30 md:h-40 md:w-40">
                    <img
                      src={
                        cat.image ||
                        "/placeholder.svg?height=300&width=300&query=Category%20image"
                      }
                      alt={`${cat.category} category`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>

                  {/* Count Badge */}
                  {cat.count !== undefined && (
                    <div className="absolute -right-1 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg">
                      <span className="text-xs font-bold text-white">{cat.count}</span>
                    </div>
                  )}

                  {/* Decorative Ring */}
                  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                {/* Category Name */}
                <div className="text-center">
                  <h3 className="text-sm font-bold capitalize transition-colors group-hover:text-pink-600 md:text-base">
                    {cat.category}
                  </h3>
                  {cat.count !== undefined && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {cat.count} items
                    </p>
                  )}
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="h-10 w-10 border-2 transition-all hover:border-pink-300 hover:bg-pink-50" />
        <CarouselNext className="h-10 w-10 border-2 transition-all hover:border-pink-300 hover:bg-pink-50" />
      </Carousel>
    </section>
  );
}