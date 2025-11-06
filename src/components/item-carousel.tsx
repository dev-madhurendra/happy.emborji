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
import { ArrowRight } from "lucide-react";

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
        setCategories(data || staticCategories);
      } catch {
        setCategories(staticCategories);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 flex justify-center">
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-pink-500 animate-bounce" />
          <div className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-bounce delay-150" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-bounce delay-300" />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-gray-900">
          Browse by <span className="text-pink-600">Category</span>
        </h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-3">
          {categories.map((cat) => (
            <CarouselItem
              key={cat.category}
              className="basis-1/2 pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Link
                to={`/category/${cat.category}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                  <img
                    src={cat.image}
                    alt={cat.category}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {cat.category}
                </h3>

                {cat.count !== undefined && (
                  <p className="text-xs text-gray-500">{cat.count} items</p>
                )}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="h-8 w-8 border border-gray-200 hover:border-pink-300 hover:bg-pink-50" />
        <CarouselNext className="h-8 w-8 border border-gray-200 hover:border-pink-300 hover:bg-pink-50" />
      </Carousel>
    </section>
  );
}
