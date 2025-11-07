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
      gradient: "from-[#D87C5D] to-[#F2A97F]",
    },
    {
      icon: Sparkles,
      title: "Uniquely Yours",
      description:
        "Custom designs tailored to your story, ensuring each piece is as unique as you are.",
      gradient: "from-[#7A8B74] to-[#D87C5D]",
    },
    {
      icon: Scissors,
      title: "Crafted by Hand",
      description:
        "Traditional techniques meet modern aesthetics in every carefully handcrafted creation.",
      gradient: "from-[#F2A97F] to-[#7A8B74]",
    },
  ];

  const galleryImages = [
    {
      src: "/studio-crochet-bouquet.jpg",
      title: "Handcrafted Bouquets",
      subtitle: "Each petal carefully shaped with love",
      gradient: "from-[#D87C5D]/70 to-[#F2A97F]/70",
    },
    {
      src: "/embroidery-hoop-art.jpg",
      title: "Embroidery Art",
      subtitle: "Detailed needlework & precision",
      gradient: "from-[#7A8B74]/70 to-[#D87C5D]/70",
    },
    {
      src: "/packaging-and-details.jpg",
      title: "Gift Ready",
      subtitle: "Beautiful packaging included",
      gradient: "from-[#F2A97F]/70 to-[#7A8B74]/70",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#FAF8F5]">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#D87C5D]/10 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#7A8B74]/15 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#F2A97F]/15 blur-3xl"></div>
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
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8CAB8] bg-[#FAF8F5]/80 px-4 py-2 text-sm backdrop-blur-sm">
          <Heart className="h-4 w-4 text-[#D87C5D]" fill="currentColor" />
          <span className="font-medium">Our Story</span>
        </div>

        <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          About{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-[#D87C5D] to-[#7A8B74] bg-clip-text text-transparent">
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
                stroke="url(#gradient-about)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-about" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D87C5D" />
                  <stop offset="100%" stopColor="#7A8B74" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#556B2F] md:text-xl">
          We create crochet and embroidery pieces that feel personal and
          thoughtful—from bouquets to keychains and hoops. Everything is made
          by hand in small batches, with love woven into every stitch. Custom
          requests are always welcome, because your story deserves to be told
          beautifully.
        </p>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border-2 bg-[#FAF8F5] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute right-4 top-4 opacity-10 transition-all duration-300 group-hover:scale-110 group-hover:opacity-20">
                <stat.icon className="h-16 w-16" />
              </div>
              <div className="relative">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D87C5D] to-[#7A8B74]">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="mb-1 text-3xl font-bold text-[#3C3C3C]">{stat.value}</p>
                <p className="text-sm text-[#556B2F]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D8CAB8] bg-[#FAF8F5]/80 px-4 py-2 text-sm backdrop-blur-sm">
            <Scissors className="h-4 w-4 text-[#7A8B74]" />
            <span className="font-medium">Our Craft</span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
            Behind the{" "}
            <span className="bg-gradient-to-r from-[#D87C5D] to-[#7A8B74] bg-clip-text text-transparent">
              Scenes
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#556B2F]">
            A glimpse into our creative process, where imagination meets
            craftsmanship
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                />
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-t ${image.gradient} to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80`}
              ></div>

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="translate-y-2 transition-all duration-300 group-hover:translate-y-0">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {image.title}
                  </h3>
                  <p className="text-sm text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {image.subtitle}
                  </p>
                  <div className="mt-4 h-1 w-0 rounded-full bg-white/50 transition-all duration-500 group-hover:w-20"></div>
                </div>
              </div>

              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
            What Makes Us Different
          </h2>
          <p className="mx-auto max-w-2xl text-[#556B2F]">
            Our commitment to quality, creativity, and personal connection in
            every piece
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border-2 bg-[#FAF8F5] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>

              <div className="relative">
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">{value.title}</h3>
                <p className="leading-relaxed text-[#556B2F]">{value.description}</p>
              </div>

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#D87C5D]/10 to-[#7A8B74]/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-[#D87C5D]/10 via-[#7A8B74]/10 to-[#F2A97F]/10 p-12 text-center shadow-2xl md:p-16">
          <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-[#D87C5D]/20 blur-2xl"></div>
          <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-[#7A8B74]/20 blur-2xl"></div>

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#F2A97F]" />
              <span className="font-medium">Ready to Create?</span>
            </div>

            <h2 className="mb-4 font-serif text-3xl font-bold md:text-5xl">
              Let's Create Something{" "}
              <span className="bg-gradient-to-r from-[#D87C5D] to-[#7A8B74] bg-clip-text text-transparent">
                Special
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[#556B2F]">
              Whether you have a custom idea or want to explore our collection,
              we're here to bring your vision to life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D87C5D] to-[#7A8B74] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#D87C5D]/30 transition-all hover:shadow-xl hover:shadow-[#D87C5D]/40">
                Start Custom Order
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border-2 bg-white px-8 py-4 text-lg font-semibold transition-all hover:bg-[#F2A97F]/20">
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
