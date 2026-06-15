"use client";
import { useState, useEffect } from "react";
import { Image as ImageIcon, Plus, X, Trash2, ToggleLeft, ToggleRight, Calendar } from "lucide-react";
import AddSeasonPoster from "../ui/addSeasonPoseter";

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
  badgeText?: string;
  ctaLabel?: string;
  ctaLink?: string;
  bgColor?: string;
  startDate?: string;
  endDate?: string;
  displayOrder: number;
}

export default function SeasonPosterTable() {
  const [posters, setPosters] = useState<PosterData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_FALLBACK_URL}/api/season-posters?limit=50`);
      const data = await res.json();
      setPosters(data.posters || []);
    } catch (err) {
      console.error("Error retrieving season banners:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_FALLBACK_URL}/season-posters/${id}/toggle`, {
        method: "PATCH",
      });
      if (res.ok) {
        // Optimistically update UI status local arrays
        setPosters((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isActive: !p.isActive } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle poster visibility status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this season poster campaign?")) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_FALLBACK_URL}/season-posters/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosters((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to eliminate poster record:", err);
    }
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    fetchPosters(); // Freshly sync arrays below the form block
  };

  return (
    <div className="space-y-6 w-full animate-fadeIn">
      {/* Dynamic Action Header matching your product creation setups */}
      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-xs">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Active Banner Rotations</h2>
          <p className="text-xs text-muted-foreground">Configure front-facing storefront carousels and timelines</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer shadow-xs ${
            showAddForm 
              ? "bg-secondary text-secondary-foreground hover:bg-color-secondary-hover" 
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {showAddForm ? (
            <>
              <X className="w-4 h-4" /> Close Form
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Add New Season
            </>
          )}
        </button>
      </div>

      {/* 1. Conditionally Displayed Add Form Component Block */}
      {showAddForm && (
        <div className="border-b border-border pb-6 transition-all duration-300">
          {/* Overriding the internal nested submission layout wrapper with a custom inline layout block success receiver */}
          <div className="relative">
            <AddSeasonPoster />
            {/* Direct hook handler trick injection to let the form refresh our dataset upon execution */}
            <div className="max-w-2xl mx-auto px-6 pb-6 bg-card border-x border-b border-border rounded-b-lg -mt-5">
              <button
                type="button"
                onClick={handleFormSuccess}
                className="w-full text-center text-xs font-semibold py-2 bg-color-success/10 text-color-success rounded-md hover:bg-color-success/20 transition cursor-pointer"
              >
                🔄 Form complete? Click here to refresh table list data below
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Management Table of All Added Seasons */}
      <div className="bg-card border border-border rounded-xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground animate-pulse">
            Loading scheduled marketing configurations...
          </div>
        ) : posters.length === 0 ? (
          <div className="p-16 text-center text-muted-foreground flex flex-col items-center gap-3">
            <ImageIcon className="w-10 h-10 opacity-40 text-primary" />
            <p className="font-medium">No season posters launched yet</p>
            <p className="text-xs max-w-xs">Click the "Add New Season" button above to publish your first festive banner.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider border-b border-border">
                  <th className="p-4 w-24">Banner</th>
                  <th className="p-4">Campaign Context</th>
                  <th className="p-4 hidden md:table-cell">Details / Action Buttons</th>
                  <th className="p-4 w-28 text-center">Order Index</th>
                  <th className="p-4 w-24 text-center">Status</th>
                  <th className="p-4 w-20 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {posters.map((poster) => (
                  <tr key={poster._id} className="hover:bg-secondary/10 transition duration-150">
                    {/* Banner column thumbnail setup */}
                    <td className="p-4 vertical-top">
                      <div className="w-20 aspect-video rounded-md overflow-hidden bg-secondary border border-border">
                        <img src={poster.image} alt={poster.title} className="w-full h-full object-cover" />
                      </div>
                    </td>

                    {/* Core Title descriptions */}
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-foreground truncate">{poster.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{poster.description}</div>
                      
                      {/* Sale points tags preview */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {poster.salePoints.map((sp, idx) => (
                          <span key={idx} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-medium">
                            • {sp.text}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Timeline range constraints display parameters */}
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        {poster.badgeText && (
                          <span className="w-fit px-2 py-0.5 rounded text-[11px] font-medium border border-color-border bg-background" style={{ color: poster.bgColor }}>
                            {poster.badgeText}
                          </span>
                        )}
                        <div className="flex items-center gap-1 mt-1 text-[11px]">
                          <Calendar className="w-3 h-3 text-color-chart-4" />
                          <span>
                            {poster.startDate ? new Date(poster.startDate).toLocaleDateString() : "Always active"} -{" "}
                            {poster.endDate ? new Date(poster.endDate).toLocaleDateString() : "Indefinite"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Display sorting priority numbers */}
                    <td className="p-4 text-center font-mono font-medium text-xs text-muted-foreground">
                      {poster.displayOrder}
                    </td>

                    {/* Toggle Switch Controls */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(poster._id)}
                        className="transition transform active:scale-95 text-primary cursor-pointer"
                        title={poster.isActive ? "Hide this campaign" : "Show this campaign"}
                      >
                        {poster.isActive ? (
                          <ToggleRight className="w-7 h-7 text-color-success" />
                        ) : (
                          <ToggleLeft className="w-7 h-7 text-muted-foreground" />
                        )}
                      </button>
                    </td>

                    {/* Operational deletion buttons */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(poster._id)}
                        className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition cursor-pointer"
                        title="Delete poster"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}