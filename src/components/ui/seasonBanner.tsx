import React from "react";
import { Truck, Gift, Shield, ArrowRight, Sparkles, HelpCircle, type LucideIcon } from "lucide-react";

// Types matching your exact backend API response structure
interface SalePoint {
  icon: string;
  text: string;
}

interface PosterData {
  _id: string;
  title: string;
  description: string;
  image: string;
  salePoints: SalePoint[];
  isActive: boolean;
  badgeText: string;
  ctaLabel: string;
  ctaLink: string;
  bgColor: string;
  startDate: string;
  endDate: string;
  displayOrder: number;
  isLive: boolean;
  id: string;
}

// Dynamic Icon Map lookup helper
const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  gift: Gift,
  shield: Shield,
  sparkles: Sparkles,
};

export const SeasonBanner: React.FC = () => {
  // Exact mock structure populated from your payload response string outputs
  const poster: PosterData = {
    _id: "6a302e4bb3eed7f705064778",
    title: "Raksha Bandhan Mega Celebration",
    description: "Celebrate the eternal bond of protection with flat 20% off on all sibling gift hampers!",
    image: "https://res.cloudinary.com/dgrsfu6wf/image/upload/v1781542474/season-posters/bpjfes99kdmusya0a5iy.jpg",
    salePoints: [
      { icon: "truck", text: "Guaranteed delivery before Rakhi" },
      { icon: "gift", text: "Free custom sibling greeting card" },
      { icon: "shield", text: "Premium eco-friendly packaging" }
    ],
    isActive: false,
    badgeText: "Limited Time Offer",
    ctaLabel: "Shop Gift Hampers",
    ctaLink: "/collections/rakhi-hampers",
    bgColor: "#7D0A43", // Deep festival maroon
    startDate: "2026-08-15T00:00:00.000Z",
    endDate: "2026-08-30T00:00:00.000Z",
    displayOrder: 1,
    isLive: false,
    id: "6a302e4bb3eed7f705064778"
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Main Campaign Hero Box */}
      <div 
        style={{ backgroundColor: poster.bgColor.trim() }} 
        className="relative overflow-hidden rounded-xl lg:rounded-2xl border border-border shadow-md transition-all duration-300 hover:shadow-lg"
      >
        {/* Background Design Embellishments to lean into your eco/handmade style */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 relative z-10">
          
          {/* Content Space (Left Side column blocks) */}
          <div className="flex flex-col items-start space-y-4 sm:space-y-6 lg:col-span-7 text-white">
            {/* Dynamic Badge Component */}
            {poster.badgeText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/15 text-white backdrop-blur-md border border-white/10">
                <Sparkles className="w-3 h-3 text-color-accent" />
                {poster.badgeText.trim()}
              </span>
            )}

            {/* Campaign Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {poster.title}
            </h2>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-white/85 max-w-xl font-light leading-relaxed">
              {poster.description}
            </p>

            {/* Key Value Propositions / Sale Points */}
            {poster.salePoints && poster.salePoints.length > 0 && (
              <div className="w-full space-y-3 pt-2">
                {poster.salePoints.map((point, index) => {
                  const SelectedIcon = iconMap[point.icon.toLowerCase()] || HelpCircle;
                  return (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white border border-white/5 transition-transform group-hover:scale-105">
                        <SelectedIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-white/90">
                        {point.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Primary Action Button (Leaning heavily into your variables setup) */}
            <div className="pt-4">
              <a
                href={poster.ctaLink.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide rounded-lg bg-color-background text-color-foreground border border-transparent shadow-sm transition-all duration-200 hover:bg-color-secondary hover:translate-x-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-ring"
              >
                {poster.ctaLabel.trim()}
                <ArrowRight className="w-4 h-4 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Media Presentation Container (Right Side Column Block) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square max-w-md rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 group">
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay gradient mask to blend with design borders */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Campaign Infobar Marquee (Utilizing your pre-baked infinite CSS rules) */}
      <div className="marquee-container relative w-full overflow-hidden mt-6 py-3 bg-color-card border-y border-color-border rounded-lg">
        <div className="marquee flex gap-12 whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span className="text-xs font-semibold tracking-widest uppercase text-color-muted-foreground flex items-center gap-2">
                ✨ {poster.title}
              </span>
              <span className="text-xs font-medium text-color-muted-foreground">
                • {poster.description}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-color-primary flex items-center gap-2">
                🏷️ FLAT 20% OFF HAMPERS
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonBanner;