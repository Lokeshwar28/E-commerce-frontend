import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty.</p> 
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-300">${item.price} × {item.quantity}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                      >
                        −
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-green-400 font-medium mt-1">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="sm:w-40 w-full h-32 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 text-right text-xl font-semibold text-blue-400">
              Total: ${calculateTotal()}
            </div>
            {cart.length > 0 && (
              <div className="text-right mt-4">
                <Link to="/checkout">
                  <button className="bg-blue-600 px-6 py-2 rounded text-white hover:bg-blue-700 transition">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;