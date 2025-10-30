import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, Heart, Package, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    { src: "/crochet-doll.jpg", label: "Unique Gifts", color: "from-blue-500 to-purple-500" },
    { src: "/crochet-and-embroidery-flatlay.jpg", label: "Embroidery Art", color: "from-pink-500 to-rose-500" },
    { src: "/crochet-bouquet.jpg", label: "Flower Bouquets", color: "from-purple-500 to-pink-500" },
    { src: "/crochet-keychain.jpg", label: "Custom Keychains", color: "from-amber-500 to-orange-500" },
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
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl"></div>
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
        {/* Content Side */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Handmade with Love</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-balance font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Crochet & Embroidery{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  that tell your story
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path
                    d="M2 10C60 4 140 4 198 10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#db2777" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Bouquet keepsakes, keychains, hoops, and custom gifts—crafted by hand with timeless textures and
              thoughtful details. Each piece is a labor of love, designed to bring joy and meaning to your moments.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm">
              <Heart className="h-4 w-4 text-pink-600" />
              <span className="font-medium text-pink-900">Handcrafted</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm">
              <Package className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-900">Custom Orders</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-900">Unique Designs</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40"
            >
              <Link to="/products" className="flex items-center gap-2">
                Shop All
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 hover:bg-accent/50">
              <Link to="/about">About Us</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-pink-400 to-purple-400"
                />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-semibold">500+ Happy Customers</p>
              <p className="text-muted-foreground">Loved worldwide</p>
            </div>
          </div>
        </div>

        {/* Interactive Carousel Gallery */}
        <div className="relative">
          {/* Main Carousel Container */}
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            {/* Slides */}
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : index < currentSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-20`}></div>
                
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.label}
                  className="h-full w-full object-cover"
                />
                
                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Label */}
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

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="absolute -right-4 top-8 z-30 rounded-2xl border bg-white/95 p-4 shadow-2xl backdrop-blur-sm md:-right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-xl font-bold">250+</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 bottom-8 z-30 rounded-2xl border bg-white/95 p-4 shadow-2xl backdrop-blur-sm md:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                <Star className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-xl font-bold">5.0</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Decorative Blobs */}
          <div className="absolute -right-8 top-1/3 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl"></div>
          <div className="absolute -left-8 bottom-1/4 -z-10 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-400/30 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}