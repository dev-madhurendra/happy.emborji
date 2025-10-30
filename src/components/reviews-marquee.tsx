import { Instagram, MessageCircle, Star } from "lucide-react"

type TextReview = {
  id: string
  name: string
  stars: number
  text: string
}

const screenshotItems = [
  { id: "w1", alt: "WhatsApp review 1" },
  { id: "i1", alt: "Instagram review 1" },
  { id: "w2", alt: "WhatsApp review 2" },
  { id: "i2", alt: "Instagram review 2" },
  { id: "w3", alt: "WhatsApp review 3" },
]

const textItems: TextReview[] = [
  { id: "t1", name: "Anika", stars: 5, text: "Beautiful bouquet! Quality is amazing." },
  { id: "t2", name: "Rahul", stars: 5, text: "Custom hoop turned out perfect." },
  { id: "t3", name: "Meera", stars: 4, text: "Loved the keychains—great gifts!" },
  { id: "t4", name: "Sana", stars: 5, text: "Fantastic detailing and super responsive." },
  { id: "t5", name: "Ishaan", stars: 5, text: "Exceeded expectations. Will order again." },
]

const WHATSAPP_SRC = "/whatsapp-review-screenshot.jpg"
const INSTAGRAM_SRC = "/instagram-dm-review-screenshot.jpg"

export function ReviewsMarquee() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Screenshot Reviews Section */}
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
            {[...screenshotItems, ...screenshotItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group relative h-96 w-[22rem] shrink-0 overflow-hidden rounded-2xl border-2 shadow-lg transition-all hover:scale-105 hover:shadow-2xl sm:h-[28rem] sm:w-[26rem]"
              >
                <img
                  src={String(item?.id ?? "").startsWith("w") ? WHATSAPP_SRC : INSTAGRAM_SRC}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
                {/* Platform Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur-sm">
                  {String(item?.id ?? "").startsWith("w") ? (
                    <>
                      <svg className="h-4 w-4 fill-green-500" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
            ))}
          </div>
        </div>
      </div>

      {/* Text Reviews Section */}
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
            {[...textItems, ...textItems].map((r, idx) => (
              <ReviewCard key={`${r.id}-${idx}`} review={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: TextReview }) {
  return (
    <div className="group flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border-2 bg-background p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
      {/* Stars */}
      <div className="mb-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < review.stars ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="mb-4 text-base leading-relaxed text-foreground">{review.text}</p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-400">
          <span className="text-sm font-bold text-white">{review.name[0]}</span>
        </div>
        <div>
          <p className="font-semibold">{review.name}</p>
          <p className="text-xs text-muted-foreground">Verified Customer</p>
        </div>
      </div>
    </div>
  )
}