import { Star, Loader, MessageCircle, Sparkles, TrendingUp, Users } from "lucide-react";
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
          star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (r.rating) distribution[r.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();
  const averageRating = calculateAverageRating();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {reviewsLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#D8E0C8] border-t-[#7A8B74]"></div>
            <Loader className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[#7A8B74]" />
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#D8E0C8] bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D5] p-16 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#D8E0C8] to-[#B3C1A3]">
            <MessageCircle className="h-12 w-12 text-[#7A8B74]" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-[#3C3C3C]">
            No Reviews Yet
          </h3>
          <p className="mx-auto max-w-md text-base text-[#556B2F]">
            Be the first to share your experience with this product! Your
            feedback helps others make informed decisions.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D8E0C8] to-[#B3C1A3] px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#7A8B74]" />
              <span className="text-sm font-semibold text-[#556B2F]">
                Customer Reviews
              </span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-[#3C3C3C]">
              What Our Customers Say
            </h2>
          </div>

          {/* Rating Overview */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Average Rating Card */}
            <div className="rounded-2xl border-2 border-[#E5D9CC] bg-gradient-to-br from-white to-[#F5F0E8] p-8 shadow-lg">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-[#7A8B74]">
                  {averageRating}
                </div>
                <div className="mb-3 flex justify-center gap-1">
                  {renderStars(Math.round(Number(averageRating)))}
                </div>
                <p className="text-sm text-[#556B2F]">
                  Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="rounded-2xl border-2 border-[#E5D9CC] bg-gradient-to-br from-white to-[#F5F0E8] p-8 shadow-lg md:col-span-2">
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = distribution[rating as keyof typeof distribution];
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex w-12 items-center gap-1">
                        <span className="text-sm font-medium text-[#3C3C3C]">
                          {rating}
                        </span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 overflow-hidden rounded-full bg-[#E5D9CC]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#7A8B74] to-[#556B2F] transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="w-12 text-right text-sm text-[#556B2F]">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((r, index) => (
              <div
                key={r.productId || index}
                className="group animate-fadeIn rounded-2xl border-2 border-[#E5D9CC] bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-[#7A8B74] hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {r.imageUrl ? (
                      <img
                        src={r.imageUrl}
                        alt={r.authorName || "Reviewer"}
                        className="h-16 w-16 rounded-xl border-2 border-[#E5D9CC] object-cover shadow-md"
                      />
                    ) : r.type === "chat" ? (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#7A8B74]/20 to-[#7A8B74]/5 shadow-md">
                        <MessageCircle className="h-8 w-8 text-[#7A8B74]" />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#D87C5D]/20 to-[#D87C5D]/5 shadow-md">
                        <Sparkles className="h-8 w-8 text-[#D87C5D]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-lg font-bold text-[#3C3C3C]">
                            {r.authorName || "Anonymous Customer"}
                          </h3>
                          {r.platform && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#7A8B74]/15 px-3 py-1 text-xs font-semibold text-[#7A8B74]">
                              {r.platform === "whatsapp" ? "📱" : "📸"}{" "}
                              {r.platform}
                            </span>
                          )}
                        </div>
                        {r.rating && (
                          <div className="flex gap-1">{renderStars(r.rating)}</div>
                        )}
                      </div>
                      {r.createdAt && (
                        <span className="text-sm text-[#556B2F]">
                          {new Date(r.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-base leading-relaxed text-[#556B2F] group-hover:text-[#3C3C3C] transition-colors">
                      "{r.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Footer */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-[#E5D9CC] bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7A8B74]/20 to-[#7A8B74]/5">
                <Users className="h-6 w-6 text-[#7A8B74]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C3C3C]">
                  {reviews.length}+
                </div>
                <div className="text-sm text-[#556B2F]">Happy Customers</div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[#E5D9CC] bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-amber-400/5">
                <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C3C3C]">
                  {averageRating}/5
                </div>
                <div className="text-sm text-[#556B2F]">Average Rating</div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[#E5D9CC] bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#3C3C3C]">
                  {Math.round((distribution[5] / reviews.length) * 100)}%
                </div>
                <div className="text-sm text-[#556B2F]">5-Star Reviews</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}