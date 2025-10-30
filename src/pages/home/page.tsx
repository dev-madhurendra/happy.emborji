import { CategoryCarousel } from "../../components/item-carousel";
import { Hero } from "../../components/hero";
import { ProductGrid } from "../../components/product-grid";
import { ReviewsMarquee } from "../../components/reviews-marquee";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <Hero />

      <CategoryCarousel />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-4 font-serif text-2xl font-semibold">Featured Products</h2>
        <ProductGrid initialTab="all" limit={8} showViewAll={true} />
      </section>

      {/* Customer Reviews */}
      <ReviewsMarquee />

      {/* Footer */}
      <SiteFooter />
    </>
  )
}
