import { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Loader,
  X,
  Upload,
  ChevronRight,
  ChevronLeft,
  Filter,
  RotateCcw,
  Star,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";

interface Review {
  _id: string;
  type: "chat" | "text";
  platform?: "whatsapp" | "instagram";
  authorName?: string;
  rating?: number;
  message: string;
  imageUrl?: string;
  productId?: string;
  createdAt: string;
}

interface ReviewFormData {
  type: "chat" | "text";
  platform?: "whatsapp" | "instagram";
  authorName?: string;
  rating?: string;
  message: string;
  productId?: string;
}

interface Filters {
  type: string;
  platform: string;
  minRating: string;
  maxRating: string;
}

export default function ReviewTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<ReviewFormData>({
    type: "text",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: "",
    platform: "",
    minRating: "",
    maxRating: "",
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "6",
      });

      if (filters.type) params.append("type", filters.type);
      if (filters.platform) params.append("platform", filters.platform);
      if (filters.minRating) params.append("minRating", filters.minRating);
      if (filters.maxRating) params.append("maxRating", filters.maxRating);

      const res = await fetch(
        `${import.meta.env.VITE_API_FALLBACK_URL}/api/reviews?${params}`
      );

      if (res.status === 401)
        throw new Error("Unauthorized – please log in again");
      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setReviews(data.reviews);
      setTotalPages(data?.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Error loading reviews");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${import.meta.env.VITE_API_FALLBACK_URL}/api/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setReviews(reviews.filter((r) => r._id !== id));
      } else {
        alert("Failed to delete review");
      }
    } catch {
      alert("Server error");
    }
  };

  const openAddModal = () => {
    setEditingReview(null);
    setFormData({
      type: "text",
      message: "",
    });
    setFile(null);
    setPreview(null);
    setShowModal(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setFormData({
      type: review.type,
      platform: review.platform,
      authorName: review.authorName,
      rating: review.rating?.toString(),
      message: review.message,
      productId: review.productId,
    });
    setFile(null);
    setPreview(review.imageUrl || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingReview(null);
    setFormData({
      type: "text",
      message: "",
    });
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

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
    if (!formData.message) {
      alert("Please fill in the message field");
      return;
    }

    if (formData.type === "text" && !formData.rating) {
      alert("Please provide a rating for text reviews");
      return;
    }

    if (formData.type === "chat" && !formData.platform) {
      alert("Please select a platform for chat reviews");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");
      const isEdit = editingReview;

      const url = isEdit
        ? `${import.meta.env.VITE_API_FALLBACK_URL}/api/reviews/${
            editingReview._id
          }`
        : `${import.meta.env.VITE_API_FALLBACK_URL}/api/reviews`;

      const method = isEdit ? "PUT" : "POST";

      const body = isEdit
        ? JSON.stringify({
            type: formData.type,
            platform: formData.platform,
            authorName: formData.authorName,
            rating: formData.rating ? Number(formData.rating) : undefined,
            message: formData.message,
            productId: formData.productId,
          })
        : null;

      const options: RequestInit = {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isEdit ? { "Content-Type": "application/json" } : {}),
        },
        ...(isEdit ? { body } : { body: createFormData(formData, file) }),
      };

      const res = await fetch(url, options);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save review");
      }

      alert(
        isEdit ? "Review updated successfully!" : "Review added successfully!"
      );
      await fetchReviews();
      closeModal();
    } catch (err: any) {
      alert(err.message || "Error saving review");
    } finally {
      setSubmitting(false);
    }
  };

  function createFormData(formData: ReviewFormData, file: File | null) {
    const fd = new FormData();
    fd.append("type", formData.type);
    fd.append("message", formData.message);
    if (formData.platform) fd.append("platform", formData.platform);
    if (formData.authorName) fd.append("authorName", formData.authorName);
    if (formData.rating) fd.append("rating", formData.rating);
    if (formData.productId) fd.append("productId", formData.productId);
    if (file) fd.append("image", file);
    return fd;
  }

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setPage(1);
    fetchReviews();
  };

  const resetFilters = () => {
    setFilters({
      type: "",
      platform: "",
      minRating: "",
      maxRating: "",
    });
    setPage(1);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return "-";
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const noFilters =
      !filters.type &&
      !filters.platform &&
      !filters.minRating &&
      !filters.maxRating;

    if (noFilters || page) {
      fetchReviews();
    }
  }, [page, filters]);


  if (loading)
    return (
      <div className="flex items-center justify-center p-10">
        <Loader className="w-6 h-6 animate-spin mr-2" /> Loading reviews...
      </div>
    );

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <>
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Reviews</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                  showFilters
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="chat">Chat</option>
                    <option value="text">Text</option>
                  </select>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Platform
                  </label>
                  <select
                    value={filters.platform}
                    onChange={(e) =>
                      handleFilterChange("platform", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Platforms</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>

                {/* Min Rating */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Min Rating
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={filters.minRating}
                    onChange={(e) =>
                      handleFilterChange("minRating", e.target.value)
                    }
                    placeholder="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Max Rating */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Max Rating
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={filters.maxRating}
                    onChange={(e) =>
                      handleFilterChange("maxRating", e.target.value)
                    }
                    placeholder="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Author</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Message</th>
              <th className="p-3">Image</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr
                key={r._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      r.type === "chat"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {r.type === "chat" ? (
                      <MessageSquare className="w-3 h-3" />
                    ) : (
                      <Star className="w-3 h-3" />
                    )}
                    {r.type}
                  </span>
                </td>
                <td className="p-3">
                  {r.platform ? (
                    <span className="capitalize">{r.platform}</span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">{r.authorName || "-"}</td>
                <td className="p-3">{renderStars(r.rating)}</td>
                <td className="p-3 max-w-xs">
                  <div className="truncate" title={r.message}>
                    {r.message}
                  </div>
                </td>
                <td className="p-3">
                  {r.imageUrl ? (
                    <img
                      src={r.imageUrl}
                      alt="Review"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(r)}
                    className="text-blue-500 hover:text-blue-600 inline-flex items-center justify-center p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteReview(r._id)}
                    className="text-red-500 hover:text-red-600 inline-flex items-center justify-center p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reviews.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No reviews found.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {/* Prev */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-0.5">
              {page > 3 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(1)}
                    className="h-8 w-8 text-sm"
                  >
                    1
                  </Button>
                  {page > 4 && <span className="px-1 text-gray-400">…</span>}
                </>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (page <= 3) pageNum = i + 1;
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = page - 2 + i;

                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="icon"
                    onClick={() => setPage(pageNum)}
                    className={`h-8 w-8 text-sm ${
                      page === pageNum
                        ? "bg-pink-600 text-white hover:bg-pink-700"
                        : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {page < totalPages - 2 && (
                <>
                  {page < totalPages - 3 && (
                    <span className="px-1 text-gray-400">…</span>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(totalPages)}
                    className="h-8 w-8 text-sm"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            {/* Next */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <span className="text-xs text-gray-500">
            Page <span className="font-medium text-gray-700">{page}</span> of{" "}
            <span className="font-medium text-gray-700">{totalPages}</span>
          </span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingReview ? "Edit Review" : "Add New Review"}
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
                  Review Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "chat" | "text",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={submitting}
                >
                  <option value="text">Text Review</option>
                  <option value="chat">Chat Screenshot</option>
                </select>
              </div>

              {formData.type === "chat" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Platform *
                  </label>
                  <select
                    value={formData.platform || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        platform: e.target.value as "whatsapp" | "instagram",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={submitting}
                  >
                    <option value="">Select Platform</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.authorName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, authorName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                  disabled={submitting}
                />
              </div>

              {formData.type === "text" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating (1-5) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter rating (1-5)"
                    disabled={submitting}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Enter review message"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Product ID (Optional)
                </label>
                <input
                  type="text"
                  value={formData.productId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, productId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Link to a product ID"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Review Image {formData.type === "chat" && "*"}
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
                  ) : editingReview ? (
                    "Update Review"
                  ) : (
                    "Add Review"
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
