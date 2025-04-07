import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <Admin />
              </PrivateRoute>
            }
          />

<Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-700">
  &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
</footer>
      
    </div>
  );
};

export default App;