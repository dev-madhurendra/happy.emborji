import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader, ArrowLeft, Package, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { slugify } from "../utils/constants";
import { Button } from "./ui/button";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function CategoryDetailsPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const encoded = encodeURIComponent(category || "");
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/categories/${encoded}/products`
        );
        const data = await res.json();
        setProducts(data.products || []);

        // Optionally, fetch category details (like image or count)
        const catRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/categories`
        );
        const cats = await catRes.json();
        const found = cats.find(
          (c: any) =>
            c.category.trim().toLowerCase() ===
            (category || "").trim().toLowerCase()
        );
        setCategoryInfo(found);
      } catch (err) {
        console.error("Error loading category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin mx-auto mb-3 text-primary" />
          <p className="text-muted-foreground">Loading category...</p>
        </div>
      </div>
    );

  function handleNavigate(): void {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          onClick={handleNavigate}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={categoryInfo?.image || "/placeholder.jpg"}
              alt={category}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{category}</h1>
            {categoryInfo && (
              <p className="text-muted-foreground">
                {categoryInfo.count}{" "}
                {categoryInfo.count > 1 ? "products" : "product"}
              </p>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/product/${slugify(p.name)}/${p._id}`}
                className="group"
              >
                <Card className="overflow-hidden border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm mb-1 truncate group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold text-sm">
                          ₹{p.price}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map((s) => (
                            <Star
                              key={s}
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
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
