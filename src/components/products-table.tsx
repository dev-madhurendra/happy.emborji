import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Loader, X, Upload } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  tag: string;
  image?: string;
}

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  tag: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    tag: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401)
        throw new Error("Unauthorized – please log in again");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data.products);
    } catch (err: any) {
      setError(err.message || "Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch {
      alert("Server error");
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      tag: "",
    });
    setFile(null);
    setPreview(null);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      tag: product.tag || "",
    });
    setFile(null);
    setPreview(product.image || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      tag: "",
    });
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate image for new products
    if (!editingProduct && !file) {
      alert("Please select an image for the product");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");
      const url = editingProduct
        ? `${import.meta.env.VITE_API_BASE_URL}/api/products/${
            editingProduct._id
          }`
        : `${import.meta.env.VITE_API_BASE_URL}/api/addProduct`;

      const method = editingProduct ? "PUT" : "POST";

      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("tag", formData.tag);
      
      // Append file if selected
      if (file) {
        formDataToSend.append("image", file);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      alert(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      await fetchProducts();
      closeModal();
    } catch (err: any) {
      alert(err.message || "Error saving product");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center p-10">
        <Loader className="w-6 h-6 animate-spin mr-2" /> Loading products...
      </div>
    );

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <>
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">All Products</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Tag</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">{p.tag || "-"}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="text-blue-500 hover:text-blue-600 inline-flex items-center justify-center p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-500 hover:text-red-600 inline-flex items-center justify-center p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No products found.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tag</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tag (optional)"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Image {!editingProduct && "*"}
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={submitting}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {preview ? (
                    <div className="space-y-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-40 object-contain rounded border border-gray-300"
                      />
                      <p className="text-sm text-blue-600 font-medium">
                        {file?.name || "Current image"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-gray-700 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </span>
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}