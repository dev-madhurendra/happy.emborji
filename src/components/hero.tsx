import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, Heart, Package, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    { src: "/crochet-doll.jpg", label: "Unique Gifts", color: "from-[#B3C1A3] to-[#7A8B74]" },
    { src: "/crochet-keychain.jpg", label: "Custom Keychains", color: "from-[#C8D8B0] to-[#7A8B74]" },
    { src: "/crochet-and-embroidery-flatlay.jpg", label: "Embroidery Art", color: "from-[#C8D8B0] to-[#7A8B74]" },
    { src: "/crochet-bouquet.jpg", label: "Flower Bouquets", color: "from-[#D8E0C8] to-[#7A8B74]" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#C8D8B0]/40 blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-[#B3C1A3]/30 blur-3xl"></div>
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
        {/* Content Side */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-[#FAF8F5]/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-[#7A8B74]" />
            <span className="font-medium text-[#556B2F]">Handmade with Love</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-balance font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-[#3C3C3C]">
              Crochet & Embroidery{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#B3C1A3] to-[#7A8B74] bg-clip-text text-transparent">
                  that tell your story
                </span>
              </span>
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-[#556B2F] md:text-xl">
              Bouquet keepsakes, keychains, hoops, and custom gifts—crafted by hand with timeless textures and
              thoughtful details. Each piece is a labor of love, designed to bring joy and meaning to your moments.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#D8E0C8] px-4 py-2 text-sm text-[#556B2F]">
              <Heart className="h-4 w-4 text-[#7A8B74]" />
              <span className="font-medium">Handcrafted</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#C8D8B0] px-4 py-2 text-sm text-[#556B2F]">
              <Package className="h-4 w-4 text-[#7A8B74]" />
              <span className="font-medium">Custom Orders</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#B3C1A3] px-4 py-2 text-sm text-[#556B2F]">
              <Sparkles className="h-4 w-4 text-[#7A8B74]" />
              <span className="font-medium">Unique Designs</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-[#B3C1A3] to-[#7A8B74] text-white shadow-md transition-all hover:shadow-lg"
            >
              <Link to="/products" className="flex items-center gap-2">
                Shop All
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-[#B3C1A3] hover:bg-[#D8E0C8]/50 text-[#556B2F]">
              <Link to="/about">About Us</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-[#FAF8F5] bg-gradient-to-br from-[#B3C1A3] to-[#7A8B74]"
                />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-[#3C3C3C]">500+ Happy Customers</p>
              <p className="text-[#556B2F]">Loved worldwide</p>
            </div>
          </div>
        </div>

        {/* Carousel Side */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? "translate-x-0 opacity-100" : index < currentSlide ? "-translate-x-full opacity-0" : "translate-x-full opacity-0"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-20`}></div>
                <img src={image.src} alt={image.label} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl">
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${image.color} animate-pulse`}></div>
                    <span className="text-lg font-semibold text-white">{image.label}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition-all hover:bg-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition-all hover:bg-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="absolute -right-4 top-8 z-30 rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur-sm md:-right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#B3C1A3] to-[#7A8B74]">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#3C3C3C]">250+</p>
                <p className="text-xs text-[#556B2F]">Products</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 bottom-8 z-30 rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur-sm md:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D8E0C8] to-[#7A8B74]">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#3C3C3C]">5.0</p>
                <p className="text-xs text-[#556B2F]">Rating</p>
              </div>
            </div>
          </div>

          {/* Decorative Blobs */}
          <div className="absolute -right-8 top-1/3 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#B3C1A3]/30 to-[#D8E0C8]/30 blur-3xl"></div>
          <div className="absolute -left-8 bottom-1/4 -z-10 h-24 w-24 rounded-full bg-gradient-to-br from-[#C8D8B0]/30 to-[#B3C1A3]/30 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
