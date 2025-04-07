import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE } from "../config";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    const res = await axios.post(
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
        clearCart();
        navigate("/products");
      }
    } catch (err) {
      console.error("Order failed:", err);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="mb-4 border-b border-gray-600 pb-2">
                <p className="font-semibold">{item.name}</p>
                <p>${Number(item.price).toFixed(2)} × {item.quantity}</p>
                <p className="text-green-400">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="mt-4 text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;