import { Routes, Route } from "react-router-dom";
import CrochetPage from "./pages/crochet/page";
import AboutPage from "./pages/about/page";
import EmbroideryPage from "./pages/embroidery/page";
import ProductsPage from "./pages/products/page";
import ReviewsPage from "./pages/reviews/page";
import HomePage from "./pages/home/page";
import AdminLogin from "./components/admin/admin-login";
import ProtectedRoute from "./components/protected-route";
import AdminDashboard from "./components/admin/admin-dashboard";
import CustomerLoginPage from "./components/customer/customer-login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/crochet" element={<CrochetPage />} />
      <Route path="/embroidery" element={<EmbroideryPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/login" element={<CustomerLoginPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
