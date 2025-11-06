import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Copy, Heart, Star } from "lucide-react";
import { slugify, whatsappHref } from "../utils/constants";

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
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const images = product.images?.length ? product.images : [product.image];

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${slugify(product.name)}/${product._id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="group relative flex flex-col border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 h-[360px]">
      {/* Wishlist */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:scale-105 transition"
      >
        <Heart
          className={`h-4 w-4 ${
            isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <div
        className="relative h-44 bg-gray-50 cursor-pointer overflow-hidden"
        onClick={() =>
          navigate(`/product/${slugify(product.name)}/${product._id}`)
        }
      >
        <img
          src={
            images[0] ||
            "/placeholder.svg?height=600&width=600&query=Product%20image"
          }
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          <div className="relative">
            <h3
              className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:line-clamp-none transition-all"
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Optional fade gradient for long names */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white to-transparent pointer-events-none group-hover:hidden"></div>
          </div>

          <p className="mt-1 text-xs text-gray-500 capitalize">
            {product.category}
          </p>

          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">(5.0)</span>
          </div>
        </div>

        <div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-bold text-rose-600">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{(product.price * 1.3).toFixed(2)}
            </span>
            <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              30% Off
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2">
            <a
              href={whatsappHref(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
            >
              Chat
            </a>

            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1 border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied ? "Copied" : "Share"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
