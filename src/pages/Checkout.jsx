import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../intercept";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE } from "../config";
import { motion } from "framer-motion";


const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post(
        `${API_BASE}/orders`,
        {
          items: cart,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("✅ Order placed successfully!");
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => navigate("/products"), 2000);
      }
    } catch (err) {
      console.error("Order failed:", err);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 via-blue-200 to-blue-300 px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white bg-opacity-90 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Checkout</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">🛒 Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4 border border-blue-200 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={item.image_url || "/images/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.png";
                  }}
                />
                <div className="text-center sm:text-left">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-700 text-sm">
                    ${Number(item.price).toFixed(2)} × {item.quantity}
                  </p>
                  <p className="text-blue-800 font-semibold">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="mt-6 text-2xl font-bold text-right text-blue-900 border-t border-blue-300 pt-4">
              Total: ${total.toFixed(2)}
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`mt-6 w-full bg-blue-600 text-white py-3 text-lg rounded-lg shadow hover:bg-blue-700 transition duration-300 active:scale-95 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Placing Order..." : "Place Order 🛍️"}
            </button>

            {orderPlaced && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-green-600 text-xl font-bold text-center mt-10"
              >
                ✅ Your order has been placed!
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;