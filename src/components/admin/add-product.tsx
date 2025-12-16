import { useState, type ChangeEvent, type FormEvent } from "react";
import { Upload, Check, AlertCircle, Loader } from "lucide-react";

interface ProductForm {
  name: string;
  price: string;
  category: string;
  tag: string;
  description?: string;
}

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

export default function AddProduct() {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: "",
    category: "",
    tag: "",
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);

    const previewArray: string[] = [];
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result as string);
        if (previewArray.length === fileArray.length) {
          setPreviews(previewArray);
        }
      };
      reader.readAsDataURL(file);
    });

    setMessage(null);
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
    if (files.length === 0) {
      setMessage({
        type: "error",
        text: "Please upload at least one product image",
      });
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
      files.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addProduct`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setMessage({ type: "success", text: "✓ Product added successfully!" });
        setForm({
          name: "",
          price: "",
          category: "",
          tag: "",
          description: "",
        });
        setFiles([]);
        setPreviews([]);
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
                Product Images *
              </label>

              <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-secondary/30 transition cursor-pointer">
                {/* File Input FIXED */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="absolute inset-0 w-full h-full z-10 opacity-0 cursor-pointer"
                />

                {/* Preview Grid */}
                {previews.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 pointer-events-none">
                    {previews.map((src, i) => (
                      <div key={i} className="space-y-2">
                        <img
                          src={src}
                          className="w-full h-32 object-cover rounded border border-border"
                        />
                        <p className="text-xs text-primary font-medium truncate">
                          {files[i]?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 pointer-events-none">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-foreground font-medium">
                      Click to upload multiple images
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF • Max 10MB each
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
