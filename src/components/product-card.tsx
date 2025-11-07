import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Copy } from "lucide-react";
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
      {/* Share Button */}
      <button
        onClick={handleShare}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#B3C1A3] shadow hover:scale-105 transition"
      >
        {copied ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <Copy className="h-4 w-4 text-white" />
        )}
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
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white to-transparent pointer-events-none group-hover:hidden"></div>
          </div>

          <p className="mt-1 text-xs text-gray-500 capitalize">{product.category}</p>

          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full bg-[#B3C1A3]"
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">(5.0)</span>
          </div>
        </div>

        <div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-bold text-[#7A8B74]">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{(product.price * 1.3).toFixed(2)}
            </span>
            <span className="text-[10px] font-medium text-[#7A8B74] bg-[#D8E0C8] px-1.5 py-0.5 rounded-full">
              30% Off
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2">
            {/* Order Button */}
            <a
              href={whatsappHref(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-[#7A8B74] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#556B2F]"
            >
              Order
            </a>

            {/* Details Button */}
            <Button
              variant="outline"
              onClick={() =>
                navigate(`/product/${slugify(product.name)}/${product._id}`)
              }
              className="flex-1 border border-[#B3C1A3] text-xs font-medium text-[#556B2F] hover:bg-[#D8E0C8] flex items-center justify-center gap-1"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
