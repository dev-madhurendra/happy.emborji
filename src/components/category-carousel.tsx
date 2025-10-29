import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

type Category = {
  category: string;
  image: string;
  count: number;
};

export function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
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
      <section className="mx-auto max-w-7xl px-4 py-8 text-center">
        <p className="text-sm text-gray-500">Loading categories...</p>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 text-center">
        <p className="text-sm text-gray-500">No categories available</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">Shop by Category</h2>
        <Link
          to="/products"
          className="text-sm text-foreground/80 hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {categories.map((cat) => (
            <CarouselItem
              key={cat.category}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
            >
              <Link
                to={{
                  pathname: "/products",
                  search: `?category=${encodeURIComponent(cat.category)}`,
                }}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative h-36 w-36 overflow-hidden rounded-full border transition group-hover:shadow">
                  <img
                    src={
                      cat.image ||
                      "/placeholder.svg?height=300&width=300&query=Category%20image"
                    }
                    alt={`${cat.category} category`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm capitalize">
                  {cat.category} ({cat.count})
                </span>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
