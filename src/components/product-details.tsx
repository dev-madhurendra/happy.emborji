import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader, ArrowLeft, Package, Star, Check, Copy } from "lucide-react";
import type { Product } from "../data/products";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { slugify, whatsappHref } from "../utils/constants";
import ReviewSection from "./reviews-section";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!product || !product._id) return;

    const slug = slugify(product.name);
    const url = `${window.location.origin}/product/${slug}/${product._id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);

        if (data?.category) {
          const relatedRes = await fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/categories/${encodeURIComponent(data.category)}/products`
          );
          const relatedData = await relatedRes.json();
          setRelated(relatedData.products.filter((p: Product) => p._id !== id));
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader className="h-12 w-12 animate-spin text-[#7A8B74]" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-6">
        <Package className="h-24 w-24 text-[#556B2F] mb-4" />
        <p className="text-2xl font-bold text-[#3C3C3C] mb-2">
          Product not found
        </p>
        <p className="text-[#556B2F] mb-6">
          The product you're looking for doesn't exist
        </p>
        <Button
          onClick={() => navigate(-1)}
          className="gap-2 bg-[#7A8B74] text-white hover:bg-[#556B2F]"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#556B2F] hover:text-[#7A8B74] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        {/* Product Card */}
        <Card className="overflow-hidden shadow-2xl border border-[#D8CAB8] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="bg-[#FAF8F5] p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7A8B74]/10 to-[#D87C5D]/20 blur-3xl"></div>
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 rounded-2xl object-contain max-h-[400px]"
              />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold bg-[#7A8B74]/20 text-[#7A8B74] px-3 py-1 rounded-full mb-4">
                  <Package className="w-3 h-3" /> {product.category}
                </span>

                <h1 className="text-4xl font-bold text-[#3C3C3C] mb-4">
                  {product.name}
                </h1>
                <p className="text-[#556B2F] mb-6">{product.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-[#7A8B74]">
                    ₹{product.price}
                  </span>
                  <span className="text-sm line-through text-[#556B2F]">
                    ₹{Math.round(product.price * 1.3)}
                  </span>
                  <span className="text-xs font-semibold bg-[#D87C5D]/20 text-[#D87C5D] px-2 py-1 rounded">
                    23% OFF
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {[
                    "Premium quality",
                    "Durable & long-lasting",
                    "Perfect for everyday use",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#7A8B74] mt-2"></div>
                      <p className="text-[#556B2F]">{feat}</p>
                    </div>
                  ))}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#556B2F]">
                    (4.0) 128 reviews
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={whatsappHref(product?.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-gradient-to-r from-[#7A8B74] to-[#D87C5D] text-white font-semibold shadow-lg hover:scale-105 transition-all"
                >
                  <span>Order on WhatsApp</span>
                </a>
                <Button
                  className="h-12 px-6 border border-[#7A8B74] text-[#7A8B74] hover:bg-[#7A8B74]/10"
                  onClick={handleShare}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <Copy className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#3C3C3C]">
                You might also like
              </h2>
              <Link
                to="/"
                className="text-sm text-[#7A8B74] font-medium hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {related.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${slugify(p.name)}/${p._id}`}
                  className="group"
                >
                  <Card className="overflow-hidden border border-[#D8CAB8] hover:border-[#7A8B74]/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm mb-1 truncate group-hover:text-[#7A8B74]">
                          {p.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7A8B74] font-bold text-sm">
                            ₹{p.price}
                          </span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map((star) => (
                              <Star
                                key={star}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ReviewSection id={product._id} />
    </div>
  );
}
