import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, Heart, Package } from "lucide-react";

export function Hero() {
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

        {/* Image Side */}
        <div className="relative">
          {/* Main Image */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-border shadow-2xl">
            <img
              src="/crochet-and-embroidery-flatlay.jpg"
              alt="Handcrafted crochet and embroidery flatlay"
              className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>

          {/* Floating Cards */}
          <div className="absolute -right-4 top-8 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur-sm md:-right-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                <Heart className="h-6 w-6 text-pink-600" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-semibold">Premium Quality</p>
                <p className="text-xs text-muted-foreground">Hand-selected materials</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 bottom-8 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur-sm md:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Customizable</p>
                <p className="text-xs text-muted-foreground">Made just for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}