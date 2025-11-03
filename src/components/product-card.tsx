import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Heart, Star, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  tag: "crochet" | "embroidery";
  image: string;
  images?: string[];
};

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const whatsappHref = `https://wa.me/919999999999?text=${encodeURIComponent(
    `Hi! I'm interested in ${product.name}. Could you share more details?`
  )}`;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <Card
      className="group relative overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
        <Sparkles className="h-3 w-3" />
        Handmade
      </div>

      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
        aria-label="Add to wishlist"
      >
        <Heart
          className={`h-5 w-5 transition-all ${
            isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-600"
          }`}
        />
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button className="relative aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={
                images[0] ||
                "/placeholder.svg?height=600&width=600&query=Product%20image"
              }
              alt={product.name}
              className={`h-full w-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">
                    Click to view details
                  </p>
                </div>
              </div>
            </div>
          </button>
        </DialogTrigger>

        <div className="space-y-3 p-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">(5.0)</span>
          </div>

          <h3 className="line-clamp-2 text-base font-semibold leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 capitalize">
              {product.category}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-pink-600">
              Rs. {product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              Rs. {(product.price * 1.3).toFixed(2)}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
              Save 30%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/40"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-400 to-green-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </a>

            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="group relative overflow-hidden border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 px-3 py-2 text-xs font-bold text-pink-700 transition-all hover:scale-105 hover:border-pink-300 hover:shadow-md"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Details
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-100 to-purple-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Button>
            </DialogTrigger>
          </div>
        </div>

        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-balance text-2xl">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem
                  key={`${product._id}-${i}`}
                  className="basis-full"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-2xl border-2">
                    <img
                      src={
                        src ||
                        "/placeholder.svg?height=600&width=600&query=Product%20image"
                      }
                      alt={`${product.name} - image ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  (5.0) Perfect Rating
                </span>
              </div>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 capitalize">
                {product.category}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-pink-600">
                Rs. {product.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                Rs. {(product.price * 1.3).toFixed(2)}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                30% OFF
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 rounded-full border bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700">
                <Heart className="h-3 w-3" fill="currentColor" />
                Handcrafted
              </div>
              <div className="flex items-center gap-1 rounded-full border bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                <Sparkles className="h-3 w-3" />
                Premium Quality
              </div>
              <div className="flex items-center gap-1 rounded-full border bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Fast Delivery
              </div>
            </div>

            <span
              key={product.tag}
              className="rounded-full border-2 bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {product.tag}
            </span>
          </div>

          <DialogFooter className="gap-3 sm:justify-between">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:shadow-pink-500/50 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Order on WhatsApp
            </a>
            <Button
              variant="outline"
              className="w-full border-2 sm:w-auto"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${
                  isWishlisted ? "fill-pink-500 text-pink-500" : ""
                }`}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
