import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader, ArrowLeft, Package, Star } from "lucide-react";
import type { Product } from "../data/products";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { slugify, whatsappHref } from "../utils/constants";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-6">
        <Package className="h-24 w-24 text-muted-foreground mb-4" />
        <p className="text-2xl font-bold mb-2">Product not found</p>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist
        </p>
        <Link to="" onClick={() => navigate(-1)}>
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          onClick={() => navigate(-1)}
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <Card className="overflow-hidden border-border shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-muted/50 to-muted p-8 lg:p-12 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl blur-3xl"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative rounded-2xl object-contain w-full h-full drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
                  <Package className="w-3 h-3" />
                  {product.category}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {product.name}
                </h1>

                <p className="text-xl mb-4 leading-tight">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{Math.round(product.price * 1.3)}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    23% OFF
                  </span>
                </div>

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
                  <span className="text-sm text-muted-foreground">
                    (4.0) 128 reviews
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <p className="text-muted-foreground">
                      Premium quality product with excellent craftsmanship
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <p className="text-muted-foreground">
                      Durable and long-lasting design
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <p className="text-muted-foreground">
                      Perfect for everyday use
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={whatsappHref(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-green-600 h-12 px-6 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/40"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 hover:bg-primary/5"
                >
                  <Star className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold">
                You might also like
              </h2>
              <Link
                to="/"
                className="text-sm text-primary font-medium hover:underline"
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
                  <Card className="overflow-hidden border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-square overflow-hidden rounded-xl group">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm mb-1 truncate group-hover:text-primary transition-colors">
                          {p.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold text-sm">
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
    </div>
  );
}
