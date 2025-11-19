import { Star, Loader } from "lucide-react";
import { useState, useEffect } from "react";

interface IReview {
  type: "chat" | "text";
  platform?: "whatsapp" | "instagram";
  authorName?: string;
  rating?: number;
  message: string;
  imageUrl?: string;
  createdAt: Date;
  productId?: string;
}

export default function ReviewSection({ id }: { id: string }) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/reviews/product/${id}`
        );
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 transition-all ${
          star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="mt-20 mx-auto" style={{ width: "90%" }}>
      {reviewsLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader className="h-8 w-8 animate-spin text-[#7A8B74]" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#556B2F] text-base">
            No reviews yet for this product. Be the first to share your
            experience!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#3C3C3C] mb-2">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">{renderStars(4)}</div>
              <span className="text-sm text-[#556B2F]">
                Average rating: 4.7/5 ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.productId}
                className="group bg-white border border-[#E5D9CC] rounded-2xl p-6 hover:shadow-lg hover:border-[#D8CAB8] transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex gap-5">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {r.imageUrl ? (
                      <img
                        src={r.imageUrl}
                        alt="reviewer"
                        className="w-16 h-16 object-cover rounded-xl border border-[#E5D9CC] shadow-sm"
                      />
                    ) : r.type === "chat" ? (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7A8B74]/20 to-[#7A8B74]/10 flex items-center justify-center text-2xl shadow-sm">
                        💬
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D87C5D]/20 to-[#D87C5D]/10 flex items-center justify-center text-2xl shadow-sm">
                        ✨
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#3C3C3C] text-base">
                          {r.authorName || "Anonymous"}
                        </p>
                        {r.platform && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-[#7A8B74]/15 text-[#7A8B74] font-medium">
                            {r.platform ?? "✓ Verified"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    {r.rating && (
                      <div className="flex gap-1.5 mb-3">
                        {renderStars(r.rating)}
                      </div>
                    )}

                    {/* Message */}
                    <p className="text-sm text-[#556B2F] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                      {r.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {/* <div className="flex justify-center pt-4">
            <button className="px-8 py-3 bg-[#7A8B74] hover:bg-[#6a7a64] text-white rounded-lg font-medium transition-colors duration-200">
              View All Reviews
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
