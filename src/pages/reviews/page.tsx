import { ReviewsMarquee } from "../../components/reviews-marquee";
import {
  Star,
  Heart,
  MessageCircle,
  Instagram,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ReviewsPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-pink-100/40 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl"></div>
      </div>

      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border-2 bg-background/80 px-6 py-3 font-medium backdrop-blur-sm transition-all hover:bg-accent hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
          <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
          <span className="font-medium">Loved by Our Customers</span>
        </div>

        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">
          Customer{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Reviews
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M2 10C60 4 140 4 198 10"
                stroke="url(#gradient4)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient4"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Real feedback from real customers. See what people are saying about
          our handcrafted creations on WhatsApp and Instagram.
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border-2 bg-background p-6">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Star className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <p className="text-3xl font-bold">5.0</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>

          <div className="rounded-2xl border-2 bg-background p-6">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>

          <div className="rounded-2xl border-2 bg-background p-6">
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-3xl font-bold">1000+</p>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </div>
        </div>
      </section>

      <ReviewsMarquee />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 p-12 text-center shadow-2xl md:p-16">
          <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
          <div
            className="absolute bottom-10 right-10 h-40 w-40 animate-pulse rounded-full bg-white/10 blur-3xl"
            style={{ animationDelay: "1s" }}
          ></div>

          <div className="relative">
            <Sparkles className="mx-auto mb-4 h-10 w-10 animate-pulse text-white" />
            <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
              Ready to Experience It Yourself?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Join hundreds of happy customers and get your own handcrafted
              masterpiece today!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-xl transition-all hover:scale-105"
            >
              Shop Now
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
