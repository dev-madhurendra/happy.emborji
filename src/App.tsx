import { Routes, Route } from "react-router-dom";
import CrochetPage from "./pages/crochet/page";
import AboutPage from "./pages/about/page";
import EmbroideryPage from "./pages/embroidery/page";
import ProductsPage from "./pages/products/page";
import ReviewsPage from "./pages/reviews/page";
import HomePage from "./pages/home/page";
import AddProduct from "./components/admin/add-product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/crochet" element={<CrochetPage />} />
      <Route path="/embroidery" element={<EmbroideryPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/admin" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
