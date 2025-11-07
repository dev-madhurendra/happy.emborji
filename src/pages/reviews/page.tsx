import { Star, Heart, MessageCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ReviewsMarquee from "../../components/reviews-marquee";

export default function ReviewsPage() {
  return (
    <div className="relative overflow-hidden bg-[#FAF8F5]">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#D87C5D]/10 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#7A8B74]/15 blur-3xl"></div>
      </div>

      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-[#D8CAB8] bg-[#FAF8F5]/80 px-6 py-3 font-medium backdrop-blur-sm transition-all hover:bg-[#D87C5D]/10 hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8CAB8] bg-[#FAF8F5]/80 px-4 py-2 text-sm backdrop-blur-sm">
          <Heart className="h-4 w-4 text-[#D87C5D]" fill="currentColor" />
          <span className="font-medium">Loved by Our Customers</span>
        </div>

        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">
          Customer{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-[#D87C5D] to-[#7A8B74] bg-clip-text text-transparent">
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
                stroke="url(#gradient-reviews)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-reviews" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D87C5D" />
                  <stop offset="100%" stopColor="#7A8B74" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-[#556B2F] md:text-xl">
          Real feedback from real customers. See what people are saying about
          our handcrafted creations on WhatsApp and Instagram.
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Star, value: "5.0", label: "Average Rating", from: "#F2A97F", to: "#D87C5D" },
            { icon: Heart, value: "500+", label: "Happy Customers", from: "#7A8B74", to: "#5D7059" },
            { icon: MessageCircle, value: "1000+", label: "Reviews", from: "#F2A97F", to: "#7A8B74" },
          ].map(({ icon: Icon, value, label, from, to }, idx) => (
            <div
              key={idx}
              className="rounded-2xl border-2 border-[#D8CAB8] bg-[#FAF8F5] p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[${from}] to-[${to}]`}>
                <Icon className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <p className="text-3xl font-bold text-[#3C3C3C]">{value}</p>
              <p className="text-sm text-[#556B2F]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Marquee */}
      <ReviewsMarquee />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D87C5D] via-[#7A8B74] to-[#F2A97F] p-12 text-center shadow-2xl md:p-16">
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#D87C5D] shadow-xl transition-all hover:scale-105"
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
