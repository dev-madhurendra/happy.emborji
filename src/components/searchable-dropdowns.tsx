import { useEffect, useState } from "react";
import type { ProductMinimal } from "../data/products";

interface ISearchableDropdowns {
  submitting: boolean;
  productQuery: string;
  setProductQuery: (value: string) => void;
  onSelect: (id: string, name: string) => void;
}

export default function SearchableDropdowns({
  submitting,
  productQuery,
  setProductQuery,
  onSelect
}: ISearchableDropdowns) {
  const [productOptions, setProductOptions] = useState<ProductMinimal[]>([]);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  useEffect(() => {
    if (!productQuery.trim()) {
      setProductOptions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_FALLBACK_URL}/api/products/search?q=${productQuery}`
      );
      const data = await res.json();
      setProductOptions(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [productQuery]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">Product</label>

      <input
        type="text"
        value={productQuery}
        onChange={(e) => {
          setProductQuery(e.target.value);
          setProductDropdownOpen(true);
        }}
        placeholder="Search product by name"
        disabled={submitting}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      {productDropdownOpen && productOptions.length > 0 && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
          {productOptions.map((p) => (
            <div
              key={p._id}
              className="px-3 py-2 cursor-pointer hover:bg-blue-50"
              onClick={() => {
                onSelect(p._id, p.name);   
                setProductQuery(p.name); 
                setProductDropdownOpen(false);
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
