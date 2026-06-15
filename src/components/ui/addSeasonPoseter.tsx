import { useState, type ChangeEvent, type FormEvent } from "react";
import { Upload, Check, AlertCircle, Loader, Plus, Trash2 } from "lucide-react";

interface SalePoint {
  icon: string;
  text: string;
}

interface PosterForm {
  title: string;
  description: string;
  isActive: string;
  badgeText: string;
  ctaLabel: string;
  ctaLink: string;
  bgColor: string;
  startDate: string;
  endDate: string;
  displayOrder: string;
}

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

export default function AddSeasonPoster() {
  const [form, setForm] = useState<PosterForm>({
    title: "",
    description: "",
    isActive: "true",
    badgeText: "",
    ctaLabel: "",
    ctaLink: "",
    bgColor: "#7D0A43", // Deep festival maroon default matching your theme accents
    startDate: "",
    endDate: "",
    displayOrder: "0",
  });

  const [salePoints, setSalePoints] = useState<SalePoint[]>([
    { icon: "truck", text: "" } // Starts with an initial point
  ]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  // Handle regular string/text inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle single banner file input stream
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setImageFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    setMessage(null);
  };

  // Sale point management logic
  const handleSalePointChange = (index: number, key: keyof SalePoint, value: string) => {
    const updated = [...salePoints];
    updated[index][key] = value;
    setSalePoints(updated);
  };

  const addSalePoint = () => {
    setSalePoints([...salePoints, { icon: "sparkles", text: "" }]);
  };

  const removeSalePoint = (index: number) => {
    setSalePoints(salePoints.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (!form.title.trim()) {
      setMessage({ type: "error", text: "Campaign title is required" });
      return false;
    }
    if (!form.description.trim()) {
      setMessage({ type: "error", text: "Campaign description is required" });
      return false;
    }
    if (!imageFile) {
      setMessage({ type: "error", text: "Please upload a campaign banner image" });
      return false;
    }
    
    // Validate sale points have values
    const hasEmptyPoints = salePoints.some(point => !point.text.trim());
    if (hasEmptyPoints) {
      setMessage({ type: "error", text: "Please fill out or remove empty sale point rows" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      
      // Append core text keys
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append binary media asset file to 'image' field expected by your Fastify parts loop
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // CRITICAL: Clean up and serialize your sale points into a single JSON String block
      const cleanSalePoints = salePoints.map(p => ({ icon: p.icon.trim(), text: p.text.trim() }));
      formData.append("salePoints", JSON.stringify(cleanSalePoints));

      const res = await fetch(
        `${import.meta.env.VITE_API_FALLBACK_URL}/season-posters`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setMessage({ type: "success", text: "✓ Season poster campaign launched successfully!" });
        // Reset states
        setForm({
          title: "",
          description: "",
          isActive: "true",
          badgeText: "",
          ctaLabel: "",
          ctaLink: "",
          bgColor: "#7D0A43",
          startDate: "",
          endDate: "",
          displayOrder: "0",
        });
        setImageFile(null);
        setPreview(null);
        setSalePoints([{ icon: "truck", text: "" }]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMessage({
          type: "error",
          text: errorData.error || "Failed to create banner. Please verify format conditions.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Connection fallback failure. Please verify backend execution state.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          {/* Header Theme block */}
          <div className="bg-primary text-primary-foreground p-6">
            <h1 className="text-3xl font-bold">Launch Season Poster</h1>
            <p className="text-primary-foreground/80 mt-1">
              Create and feature promo content banners on your layout grid
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Status alerts handler */}
            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-3 border ${
                  message.type === "success"
                    ? "bg-success/10 border-success text-success"
                    : message.type === "error"
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {message.type === "success" && <Check className="w-5 h-5 flex-shrink-0" />}
                {message.type === "error" && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            {/* Title text input component */}
            <div>
              <label className="block text-sm font-semibold mb-2">Campaign Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="e.g., Raksha Bandhan Mega Celebration"
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Description textarea */}
            <div>
              <label className="block text-sm font-semibold mb-2">Campaign Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Details regarding your promotional codes or collection limits..."
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Layout Customization Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Badge Text</label>
                <input
                  type="text"
                  name="badgeText"
                  value={form.badgeText}
                  onChange={handleInputChange}
                  placeholder="e.g., Limited Time Offer"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Background Tint (Hex Code)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="bgColor"
                    value={form.bgColor}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-12 h-10 border border-border rounded-lg p-0.5 cursor-pointer bg-input"
                  />
                  <input
                    type="text"
                    name="bgColor"
                    value={form.bgColor}
                    onChange={handleInputChange}
                    placeholder="#7D0A43"
                    disabled={loading}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Call To Action settings blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">CTA Label</label>
                <input
                  type="text"
                  name="ctaLabel"
                  value={form.ctaLabel}
                  onChange={handleInputChange}
                  placeholder="e.g., Shop Gift Hampers"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">CTA Route/Link</label>
                <input
                  type="text"
                  name="ctaLink"
                  value={form.ctaLink}
                  onChange={handleInputChange}
                  placeholder="e.g., /collections/rakhi-hampers"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Interactive Timeline Range Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Start Date (Optional)</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">End Date (Optional)</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Visibility Settings Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Display Sort Index</label>
                <input
                  type="number"
                  name="displayOrder"
                  value={form.displayOrder}
                  onChange={handleInputChange}
                  min="0"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Initial Status</label>
                <select
                  name="isActive"
                  value={form.isActive}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="true">Active (Visible)</option>
                  <option value="false">Hidden (Draft)</option>
                </select>
              </div>
            </div>

            {/* Campaign Highlight Sale Points Array Element Builder */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold">Value Highlights (Sale Points)</label>
                <button
                  type="button"
                  onClick={addSalePoint}
                  disabled={loading}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-color-secondary-hover transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Row
                </button>
              </div>

              <div className="space-y-3">
                {salePoints.map((point, index) => (
                  <div key={index} className="flex gap-2 items-center animate-fadeIn">
                    <select
                      value={point.icon}
                      onChange={(e) => handleSalePointChange(index, "icon", e.target.value)}
                      disabled={loading}
                      className="w-1/3 px-3 py-2 rounded-lg border border-border bg-input focus:outline-none text-sm"
                    >
                      <option value="truck">🚚 Truck (Delivery)</option>
                      <option value="gift">🎁 Gift (Hamper)</option>
                      <option value="shield">🛡️ Shield (Safety)</option>
                      <option value="sparkles">✨ Sparkles (Feature)</option>
                    </select>
                    
                    <input
                      type="text"
                      value={point.text}
                      onChange={(e) => handleSalePointChange(index, "text", e.target.value)}
                      placeholder="e.g., Guaranteed delivery before Rakhi"
                      disabled={loading}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:outline-none text-sm"
                    />

                    {salePoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSalePoint(index)}
                        disabled={loading}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Single Binary Media Stream File input block matching your exact Product Layout style */}
            <div>
              <label className="block text-sm font-semibold mb-2">Campaign Poster Image *</label>
              <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-secondary/30 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="absolute inset-0 w-full h-full z-10 opacity-0 cursor-pointer"
                />

                {preview ? (
                  <div className="space-y-2 pointer-events-none">
                    <img
                      src={preview}
                      alt="Banner Preview"
                      className="w-full h-48 object-cover rounded-lg border border-border"
                    />
                    <p className="text-xs text-primary font-medium truncate">{imageFile?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2 pointer-events-none">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-foreground font-medium">Click or drag banner layout image here</p>
                    <p className="text-xs text-muted-foreground">Landscape ratio recommended • Max 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Execute Form Submission button action block */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Launching Campaign Banners...
                </>
              ) : (
                "Publish Season Poster"
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