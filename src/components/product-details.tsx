import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Loader, 
  ArrowLeft, 
  Package, 
  Star, 
  Check, 
  Copy, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Share2
} from "lucide-react";
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
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const navigate = useNavigate();

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

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images[0] || data.image);

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

  const images = product.images?.length ? product.images : [product.image];
  const discount = product.discount ?? 23;
  const originalPrice = Math.round(product.price / (1 - discount / 100));

  const handlePrevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#556B2F] hover:text-[#7A8B74] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100">
              <div className="relative aspect-square">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Wishlist & Share */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="bg-white/95 hover:bg-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        liked ? "fill-red-500 text-red-500" : "text-gray-700"
                      }`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white/95 hover:bg-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110"
                    aria-label="Share product"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Share2 className="w-5 h-5 text-gray-700" />
                    )}
                  </button>
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-sm font-bold">{discount}% OFF</span>
                  </div>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setSelectedImage(img);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-[#7A8B74] shadow-lg scale-105"
                        : "border-gray-200 hover:border-[#7A8B74]/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Category & Tag */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#7A8B74]/10 text-[#7A8B74] px-3 py-1.5 rounded-full">
                <Package className="w-3.5 h-3.5" /> {product.category}
              </span>
              <span className="inline-flex items-center text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full capitalize">
                {product.tag}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#3C3C3C] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg">
                <span className="font-bold text-sm">4.5</span>
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                2,847 ratings & 312 reviews
              </span>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#7A8B74]">
                  ₹{product.price.toFixed(0)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
                <span className="text-lg font-bold text-green-600">
                  {discount}% off
                </span>
              </div>
              <p className="text-sm text-green-700 font-medium">
                You save ₹{(originalPrice - product.price).toFixed(0)}
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="font-semibold text-lg text-[#3C3C3C] mb-3">
                  Product Details
                </h3>
                <p className="text-[#556B2F] leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="font-semibold text-lg text-[#3C3C3C] mb-4">
                Key Features
              </h3>
              <div className="space-y-3">
                {[
                  "Premium handcrafted quality",
                  "Durable & long-lasting materials",
                  "Perfect for gifts & personal use",
                  "Unique & customizable designs",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7A8B74]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#7A8B74]" />
                    </div>
                    <p className="text-[#556B2F]">{feat}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="bg-green-100 rounded-full p-2">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#3C3C3C]">Free Delivery</p>
                  <p className="text-xs text-gray-500">On all orders</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="bg-blue-100 rounded-full p-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#3C3C3C]">Secure Pay</p>
                  <p className="text-xs text-gray-500">100% safe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="bg-purple-100 rounded-full p-2">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#3C3C3C]">Easy Return</p>
                  <p className="text-xs text-gray-500">7 days policy</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-200">
              <a
                href={whatsappHref(product?.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-14 rounded-xl bg-gradient-to-r from-[#7A8B74] to-[#556B2F] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Order on WhatsApp
              </a>
              <button
                onClick={handleShare}
                className="h-14 w-14 flex items-center justify-center rounded-xl border-2 border-[#7A8B74] text-[#7A8B74] hover:bg-[#7A8B74] hover:text-white transition-all hover:scale-105"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#3C3C3C]">
                Similar Products
              </h2>
              <Link
                to="/products"
                className="text-sm font-semibold text-[#7A8B74] hover:text-[#556B2F] hover:underline transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {related.slice(0, 6).map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${slugify(p.name)}/${p._id}`}
                  className="group"
                >
                  <Card className="overflow-hidden border-2 border-gray-100 hover:border-[#7A8B74] hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-square overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 space-y-2">
                        <p className="font-semibold text-sm line-clamp-2 text-gray-800 group-hover:text-[#7A8B74] transition-colors">
                          {p.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7A8B74] font-bold text-base">
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