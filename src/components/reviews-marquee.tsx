import { useEffect, useState } from "react";
import { Star, MessageCircle } from "lucide-react";

interface Review {
  _id: string;
  type: "chat" | "text";
  platform?: "whatsapp" | "instagram";
  authorName?: string;
  rating?: number;
  message: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ReviewsMarquee() {
  const [chatReviews, setChatReviews] = useState<Review[]>([]);
  const [textReviews, setTextReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_FALLBACK_URL}/api/reviews?limit=100`
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        const allReviews = data.reviews || [];
        setChatReviews(allReviews.filter((r: Review) => r.type === "chat"));
        setTextReviews(allReviews.filter((r: Review) => r.type === "text"));
      } catch (err: any) {
        setError(err.message || "Error loading reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center p-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E8D5C4]/50 border-t-pink-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Error loading reviews: {error}
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Chat Reviews */}
      {chatReviews.length > 0 && (
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-[#FAF8F5]/80 px-3 py-1 text-xs backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5 text-[#D87C5D]" />
              <span className="font-medium text-[#556B2F]">Social Proof</span>
            </div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl text-[#3C3C3C]">
              From Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
          </div>
          <p className="mb-6 text-[#556B2F]">
            Real conversations from WhatsApp and Instagram • Hover to pause
          </p>

          <div className="marquee-container overflow-hidden rounded-2xl border border-[#D8CAB8] bg-[#FAF8F5]/70 p-6 shadow-md">
            <div className="marquee gap-6">
              {[...chatReviews, ...chatReviews].map((review, idx) => (
                <ChatReviewCard key={`${review._id}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Text Reviews */}
      {textReviews.length > 0 && (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-[#FAF8F5]/80 px-3 py-1 text-xs backdrop-blur-sm">
              <Star
                className="h-3.5 w-3.5 text-amber-400"
                fill="currentColor"
              />
              <span className="font-medium text-[#556B2F]">Testimonials</span>
            </div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl text-[#3C3C3C]">
              What Customers{" "}
              <span className="text-[#7A8B74]">
                Say
              </span>
            </h2>
          </div>

          <div className="marquee-container overflow-hidden rounded-2xl border border-[#D8CAB8] bg-[#FAF8F5]/70 p-6 shadow-md">
            <div className="marquee-reverse gap-6">
              {[...textReviews, ...textReviews].map((review, idx) => (
                <TextReviewCard key={`${review._id}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      )}

      {chatReviews.length === 0 && textReviews.length === 0 && (
        <div className="text-center py-20 text-[#556B2F]">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No reviews yet. Be the first to review!</p>
        </div>
      )}

      <style>{`
        .marquee-container { position: relative; }
        .marquee, .marquee-reverse { display: flex; animation: scroll 40s linear infinite; }
        .marquee-reverse { animation: scroll-reverse 40s linear infinite; }
        .marquee-container:hover .marquee, .marquee-container:hover .marquee-reverse { animation-play-state: paused; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </section>
  );
}

function ChatReviewCard({ review }: { review: Review }) {
  return (
    <div className="group relative h-96 w-[22rem] shrink-0 overflow-hidden rounded-2xl border border-[#D8CAB8] bg-[#FAF8F5]/70 shadow-md transition-all hover:scale-105 hover:shadow-lg sm:h-[28rem] sm:w-[26rem]">
      {review.imageUrl ? (
        <img
          src={review.imageUrl}
          alt="review"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]/50 rounded-2xl">
          <MessageCircle className="w-16 h-16 mb-4 text-[#D8CAB8]" />
          <p className="text-[#556B2F] text-sm leading-relaxed">
            {review.message}
          </p>
          {review.authorName && (
            <p className="mt-4 font-semibold text-[#3C3C3C]">
              — {review.authorName}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function TextReviewCard({ review }: { review: Review }) {
  const rating = review.rating || 5;
  return (
    <div className="group flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-[#D8CAB8] bg-[#FAF8F5]/70 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 text-sm text-[#556B2F] leading-relaxed">
        {review.message}
      </p>
      <div className="flex items-center gap-3 border-t border-[#D8CAB8] pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7A8B74] to-[#D87C5D]">
          <span className="text-sm font-bold text-white">
            {review.authorName
              ? review.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "?"}
          </span>
        </div>
        <div>
          <p className="font-semibold text-[#3C3C3C]">
            {review.authorName || "Anonymous"}
          </p>
          <p className="text-xs text-[#556B2F]">Verified Customer</p>
        </div>
      </div>
    </div>
  );
}
