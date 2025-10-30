import {
  Heart,
  Scissors,
  Sparkles,
  Package,
  Users,
  Award,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const stats = [
    { icon: Heart, value: "500+", label: "Happy Customers" },
    { icon: Sparkles, value: "1000+", label: "Pieces Created" },
    { icon: Award, value: "5.0", label: "Average Rating" },
    { icon: Package, value: "100%", label: "Handmade" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Every stitch carries intention and care, transforming threads into memories that last.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Sparkles,
      title: "Uniquely Yours",
      description:
        "Custom designs tailored to your story, ensuring each piece is as unique as you are.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Scissors,
      title: "Crafted by Hand",
      description:
        "Traditional techniques meet modern aesthetics in every carefully handcrafted creation.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const galleryImages = [
    {
      src: "/studio-crochet-bouquet.jpg",
      title: "Handcrafted Bouquets",
      subtitle: "Each petal carefully shaped with love",
      color: "from-pink-500/80 to-rose-500/80",
    },
    {
      src: "/embroidery-hoop-art.jpg",
      title: "Embroidery Art",
      subtitle: "Detailed needlework & precision",
      color: "from-purple-500/80 to-pink-500/80",
    },
    {
      src: "/packaging-and-details.jpg",
      title: "Gift Ready",
      subtitle: "Beautiful packaging included",
      color: "from-amber-500/80 to-orange-500/80",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-pink-100/40 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl"></div>
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
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
            <span className="font-medium">Our Story</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            About{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                happy.embroji
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C60 4 140 4 198 10"
                  stroke="url(#gradient2)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="gradient2"
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

          {/* Description */}
          <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            We create crochet and embroidery pieces that feel personal and
            thoughtful—from bouquets to keychains and hoops. Everything is made
            by hand in small batches, with love woven into every stitch. Custom
            requests are always welcome, because your story deserves to be told
            beautifully.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border-2 bg-background p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute right-4 top-4 opacity-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-20">
                <stat.icon className="h-16 w-16" />
              </div>
              <div className="relative">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mb-1 text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Image Gallery Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16">
        {/* Background Accent */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent"></div>

        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Scissors className="h-4 w-4 text-purple-500" />
            <span className="font-medium">Our Craft</span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
            Behind the{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Scenes
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            A glimpse into our creative process, where imagination meets
            craftsmanship
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-pink-500/20"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${image.color} to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80`}
              ></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="translate-y-2 transition-all duration-300 group-hover:translate-y-0">
                  {/* Icon Badge */}
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {image.title}
                  </h3>
                  <p className="text-sm text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {image.subtitle}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-4 h-1 w-0 rounded-full bg-white/50 transition-all duration-500 group-hover:w-20"></div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
            </div>
          ))}
        </div>

        {/* Additional Info Banner */}
        <div className="mt-12 overflow-hidden rounded-2xl border bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-2xl font-bold">Want to see more?</h3>
              <p className="text-muted-foreground">
                Follow our journey on social media for daily inspiration
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl">
                <Heart className="h-5 w-5" fill="currentColor" />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl">
                <Sparkles className="h-5 w-5" />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl">
                <Package className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
            What Makes Us Different
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Our commitment to quality, creativity, and personal connection in
            every piece
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border-2 bg-background p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>

              <div className="relative">
                {/* Icon */}
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-bold">{value.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-pink-50 to-purple-50 p-12 text-center shadow-2xl md:p-16">
          {/* Decorative Elements */}
          <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-pink-200/50 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-purple-200/50 blur-2xl"></div>

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-medium">Ready to Create?</span>
            </div>

            <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
              Let's Create Something{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Special
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Whether you have a custom idea or want to explore our collection,
              we're here to bring your vision to life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40">
                Start Custom Order
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border-2 bg-white px-8 py-4 text-lg font-semibold transition-all hover:bg-accent/50">
                <Users className="h-5 w-5" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
