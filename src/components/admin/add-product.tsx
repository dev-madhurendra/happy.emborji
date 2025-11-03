import { useState, type ChangeEvent, type FormEvent } from "react";
import { Upload, Check, AlertCircle, Loader } from "lucide-react";

interface ProductForm {
  name: string;
  price: string;
  category: string;
  tag: string;
}

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

export default function AdminPage() {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: "",
    category: "",
    tag: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setMessage(null);
    }
  };

  const validateForm = (): boolean | void => {
    if (!form.name.trim()) {
      setMessage({ type: "error", text: "Product name is required" });
      return;
    }
    if (!form.price || isNaN(parseFloat(form.price))) {
      setMessage({ type: "error", text: "Please enter a valid price" });
      return;
    }
    if (!form.category.trim()) {
      setMessage({ type: "error", text: "Category is required" });
      return;
    }
    if (!file) {
      setMessage({ type: "error", text: "Please upload a product image" });
      return;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() !== true) return;

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) formData.append("image", file);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addProduct`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setMessage({ type: "success", text: "✓ Product added successfully!" });
        setForm({ name: "", price: "", category: "", tag: "" });
        setFile(null);
        setPreview(null);
      } else {
        setMessage({
          type: "error",
          text: "Failed to upload product. Please try again.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Connection error. Please check your server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-primary-foreground/80 mt-1">
              Fill in the details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-3 border ${
                  message.type === "success"
                    ? "bg-accent/20 border-accent text-accent-foreground"
                    : message.type === "error"
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {message.type === "success" && (
                  <Check className="w-5 h-5 flex-shrink-0" />
                )}
                {message.type === "error" && (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Product Name *
              </label>
              <input
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-input border border-border text-foreground placeholder-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Price *
                </label>
                <input
                  name="price"
                  placeholder="Rs 0.00"
                  value={form.price}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-input border border-border text-foreground placeholder-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Category *
                </label>
                <input
                  name="category"
                  placeholder="e.g., Electronics"
                  value={form.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-input border border-border text-foreground placeholder-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Tags 
              </label>
              <input
                name="tag"
                placeholder="Embroidery or Crochet"
                value={form.tag}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-input border border-border text-foreground placeholder-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Product Image *
              </label>
              <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-secondary/30 transition cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={loading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {preview ? (
                  <div className="space-y-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border border-border"
                    />
                    <p className="text-sm text-primary font-medium">
                      {file?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-foreground font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-4">
          Fields marked with * are required
        </p>
      </div>
    </div>
  );
}
