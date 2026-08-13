import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AuthProvider from "./context/auth/AuthProvider";
import ProductsProvider from "./context/products/ProductsProvider";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CartProvider from "./context/cart/CartProvider";
import AdminProductsPage from "./pages/AdminProductsPage";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<CartPage />} />
                </Route>

                <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin" element={<AdminProductsPage />} />
                  <Route
                    path="/products/add-product"
                    element={<ProductFormPage />}
                  />
                  <Route
                    path="/products/edit/:id"
                    element={<ProductFormPage />}
                  />
                </Route>

                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
