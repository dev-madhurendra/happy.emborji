import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toTitleCase } from "../lib/utils";

type Category = {
  category: string;
  images?: string[];
  image?: string;
  count?: number;
};

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_FALLBACK_URL}/api/categories`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCategories(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    setScrollPosition(scrollLeft);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    const newPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!categories.length || isHovered) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    autoScrollIntervalRef.current = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      if (scrollLeft >= scrollWidth - clientWidth - 5) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({
          left: scrollLeft + clientWidth * 0.75,
          behavior: "smooth",
        });
      }
    }, 3500);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
  }, [categories, isHovered]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateScrollButtons();
    };

    container.addEventListener("scroll", handleScroll);
    updateScrollButtons();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [categories, updateScrollButtons]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-center py-20">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#7A8B74] animate-bounce" />
            <div
              className="h-3 w-3 rounded-full bg-[#B3C1A3] animate-bounce delay-150"
              style={{ animationDelay: "0.15s" }}
            />
            <div
              className="h-3 w-3 rounded-full bg-[#D8E0C8] animate-bounce delay-300"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <svg
              className="w-7 h-7 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to load categories
          </h3>
          <p className="text-sm text-gray-600">
            Please try refreshing the page
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Shop by <span className="text-[#7A8B74]">Category</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Discover our curated collections
          </p>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#7A8B74] hover:text-[#5F7259] transition-colors group">
          <span>View All</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Buttons - Desktop Only */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            scroll("left");
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border-2 border-[#B3C1A3] transition-all duration-300 ${
            canScrollLeft
              ? "hover:border-[#7A8B74] hover:bg-[#F5F7F3] cursor-pointer opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-5 w-5 text-[#7A8B74]" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            scroll("right");
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border-2 border-[#B3C1A3] transition-all duration-300 ${
            canScrollRight
              ? "hover:border-[#7A8B74] hover:bg-[#F5F7F3] cursor-pointer opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-5 w-5 text-[#7A8B74]" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-2 px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((cat, index) => (
            <Link
              key={`${cat.category}-${index}`}
              to={`/category/${cat.category}`}
              className="flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-44 group cursor-pointer"
            >
              <div className="relative">
                <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#F5F7F3] to-[#E8EDE3] shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:scale-[1.08]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  <img
                    src={cat.image || cat.images[0]}
                    alt={cat.category}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-125"
                    loading="lazy"
                  />

                  {cat.count !== undefined && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#7A8B74] rounded-full blur-sm opacity-60" />
                        <div className="relative px-2.5 py-1 bg-[#7A8B74] text-white text-xs font-bold rounded-full shadow-lg">
                          {cat.count}+
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs sm:text-sm font-bold text-[#7A8B74] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Explore Now
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 text-center px-1">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#7A8B74] transition-colors duration-300 line-clamp-2 leading-tight">
                    {toTitleCase(cat.category)}
                  </h3>

                  <div className="mt-2 h-0.5 w-0 bg-[#7A8B74] mx-auto rounded-full transition-all duration-500 group-hover:w-12" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-6 md:hidden">
          {Array.from({
            length: Math.min(Math.ceil(categories.length / 3), 8),
          }).map((_, i) => {
            const containerWidth =
              scrollContainerRef.current?.clientWidth || 300;
            const currentDot = Math.floor(scrollPosition / containerWidth);
            return (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentDot === i ? "w-8 bg-[#7A8B74]" : "w-1.5 bg-[#D8E0C8]"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile View All Button */}
      <div className="mt-8 flex justify-center sm:hidden">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#7A8B74] text-white rounded-full text-sm font-semibold shadow-lg hover:bg-[#5F7259] active:scale-95 transition-all duration-300 group">
          <span>View All Categories</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-0.5rem);
          }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </section>
  );
}
