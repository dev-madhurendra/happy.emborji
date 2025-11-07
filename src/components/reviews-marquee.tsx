import { useEffect, useState } from "react";
import { Instagram, MessageCircle, Star, Loader } from "lucide-react";

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

        // Separate chat and text reviews
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading reviews: {error}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Screenshot Reviews Section (Chat) */}
      {chatReviews.length > 0 && (
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5 text-green-500" />
              <span className="font-medium">Social Proof</span>
            </div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              From Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
          </div>
          <p className="mb-6 text-muted-foreground">
            Real conversations from WhatsApp and Instagram • Hover to pause
          </p>

          <div className="marquee-container overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-pink-50/50 to-purple-50/50 p-6 shadow-xl">
            <div className="marquee gap-6">
              {[...chatReviews, ...chatReviews].map((review, idx) => (
                <ChatReviewCard key={`${review._id}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Text Reviews Section */}
      {textReviews.length > 0 && (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium">Testimonials</span>
            </div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              What Customers{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </div>

          <div className="marquee-container overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-amber-50/50 to-pink-50/50 p-6 shadow-xl">
            <div className="marquee-reverse gap-6">
              {[...textReviews, ...textReviews].map((review, idx) => (
                <TextReviewCard key={`${review._id}-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {chatReviews.length === 0 && textReviews.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No reviews yet. Be the first to review!</p>
        </div>
      )}

      <style>{`
        .marquee-container {
          position: relative;
        }

        .marquee,
        .marquee-reverse {
          display: flex;
          animation: scroll 10s linear infinite;
        }

        .marquee-reverse {
          animation: scroll-reverse 10s linear infinite;
        }

        .marquee-container:hover .marquee,
        .marquee-container:hover .marquee-reverse {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

function ChatReviewCard({ review }: { review: Review }) {
  const isWhatsApp = review.platform === "whatsapp";

  return (
    <div className="group relative h-96 w-[22rem] shrink-0 overflow-hidden rounded-2xl border-2 shadow-lg transition-all hover:scale-105 hover:shadow-2xl sm:h-[28rem] sm:w-[26rem]">
      {review.imageUrl ? (
        <img
          src={review.imageUrl}
          alt={`${review.platform} review`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center p-6">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.message}
            </p>
            {review.authorName && (
              <p className="mt-4 font-semibold text-gray-700">
                — {review.authorName}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Platform Badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur-sm">
        {isWhatsApp ? (
          <>
            <svg className="h-4 w-4 fill-green-500" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-xs font-semibold">WhatsApp</span>
          </>
        ) : (
          <>
            <Instagram className="h-4 w-4 text-pink-600" />
            <span className="text-xs font-semibold">Instagram</span>
          </>
        )}
      </div>
    </div>
  );
}

function TextReviewCard({ review }: { review: Review }) {
  const rating = review.rating || 5;

  return (
    <div className="group flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border-2 bg-background p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
      {/* Stars */}
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

      {/* Review Text */}
      <p className="mb-4 text-base leading-relaxed text-foreground">
        {review.message}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-400">
          <span className="text-sm font-bold text-white">
            {review.authorName?.[0]?.toUpperCase() || "?"}
          </span>
        </div>
        <div>
          <p className="font-semibold">{review.authorName || "Anonymous"}</p>
          <p className="text-xs text-muted-foreground">Verified Customer</p>
        </div>
      </div>
    </div>
  );
}