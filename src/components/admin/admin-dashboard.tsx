"use client";
import { useState, useEffect } from "react";
import {
  Package,
  Tag,
  Layers,
  Star,
  LogOut,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import ProductTable from "../products-table";
import { Button } from "../ui/button";
import ReviewTable from "../review-table";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalTags: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`
      );
      const data = await res.json();
      const products = data.products || [];

      const categories = new Set(products.map((p: any) => p.category?.trim()));
      const tags = new Set(products.map((p: any) => p.tag?.trim()));

      setStats({
        totalProducts: products.length,
        totalCategories: categories.size,
        totalTags: tags.size,
      });
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        w-64 bg-gradient-to-b from-pink-600 to-purple-700 text-white p-6 flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="text-2xl font-bold">Happy Embroji</h2>
            <button
              className="md:hidden p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === "dashboard"
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === "products"
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              <Package className="h-5 w-5" />
              Products
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
                activeTab === "reviews"
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              <Star className="h-5 w-5" />
              Reviews
            </button>
          </nav>
        </div>

        <Button
          onClick={handleLogout}
          className="mt-10 flex items-center justify-center gap-2 w-full bg-white text-pink-700 hover:bg-gray-100 font-semibold"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        {/* Topbar (Mobile) */}
        <div className="flex items-center justify-between mb-8 md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-800" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === "dashboard"
              ? "Dashboard"
              : activeTab === "products"
              ? "Products"
              : "Reviews"}
          </h1>
        </div>

        {/* Header for larger screens */}
        <header className="hidden md:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === "dashboard"
              ? "Dashboard Overview"
              : activeTab === "products"
              ? "Manage Products"
              : "Product Reviews"}
          </h1>
        </header>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
              <Package className="h-10 w-10 text-pink-600" />
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalProducts}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
              <Layers className="h-10 w-10 text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalCategories}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
              <Tag className="h-10 w-10 text-yellow-600" />
              <div>
                <p className="text-gray-500 text-sm">Unique Tags</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalTags}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && <ProductTable />}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="text-center py-20 text-gray-500">
            <ReviewTable />
          </div>
        )}
      </main>
    </div>
  );
}
