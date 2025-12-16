import { useRef, useState, type MouseEvent } from "react";
import { Check, Copy, Heart, Truck, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { slugify, whatsappHref } from "../utils/constants";
import { toTitleCase } from "../lib/utils";
import { useNavigate } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  tag: "crochet" | "embroidery";
  image: string;
  images?: string[];
  discount?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleImageNav(undefined, "next");
    } else if (distance < -minSwipeDistance) {
      handleImageNav(undefined, "prev");
    }
  };

  const images = product.images?.length ? product.images : [product.image];

  const discount = product.discount ?? 20;
  const originalPrice = product.price / (1 - discount / 100);

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${slugify(product.name)}/${
      product._id
    }`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleImageNav = (
    e: MouseEvent<HTMLButtonElement> | undefined,
    direction: string
  ) => {
    e?.stopPropagation();
    setImageLoaded(false);
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  const handleDetailsClick = () => {
    navigate(`/product/${slugify(product.name)}/${product._id}`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div
        className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer"
        style={{ aspectRatio: "1/1" }}
        onClick={() =>
          navigate(`/product/${slugify(product.name)}/${product._id}`)
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
        )}

        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } group-hover:scale-105`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation buttons - Always visible on mobile, hover on desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => handleImageNav(e, "prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={(e) => handleImageNav(e, "next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200"
            aria-label="Share product"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-gray-700" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200"
            aria-label={liked ? "Unlike product" : "Like product"}
          >
            <Heart
              className={`h-4 w-4 transition-all duration-300 ${
                liked ? "fill-red-500 text-red-500 scale-110" : "text-gray-700"
              }`}
            />
          </button>
        </div>

        {discount > 0 && (
          <div className="absolute top-3 left-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 shadow-lg">
            <span className="text-xs font-bold text-white">
              {discount}% OFF
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 rounded-full bg-[#7A8B74]/90 px-3 py-1 backdrop-blur-sm">
          <span className="text-xs font-medium text-white capitalize">
            {product.tag}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-[#556B2F] transition-colors">
          {toTitleCase(product.name)}
        </h3>

        <p className="text-sm text-gray-500 capitalize mb-3">
          {product.category}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">5.0</span>
          <span className="text-sm text-gray-400">(124)</span>
        </div>

        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-green-50 border border-green-100">
          <Truck className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-xs font-medium text-green-700">
            Free Delivery Available
          </span>
        </div>

        <div className="flex-1" />

        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toFixed(0)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice.toFixed(0)}
              </span>
            )}
          </div>
          {discount > 0 && (
            <p className="text-xs text-green-600 font-medium">
              You save ₹{(originalPrice - product.price).toFixed(0)}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <a
            href={whatsappHref(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7A8B74] to-[#556B2F] px-4 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Order
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsClick();
            }}
            className="flex-1 border-2 border-[#B3C1A3] text-sm font-semibold text-[#556B2F] hover:bg-[#F0F3EA] hover:border-[#7A8B74] hover:scale-105 transition-all duration-200 rounded-lg"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}