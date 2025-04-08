import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 via-blue-200 to-blue-300 text-black px-4 py-10 bg-white bg-opacity-90">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-black text-center">Your cart is empty.</p> 
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-white bg-opacity-90 p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-2xl transition-transform duration-300">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold hover:text-blue-400 transition">{item.name}</h3>
                    <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1">Electronics</span>
                    <p className="text-black">${item.price} × {item.quantity}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="text-black">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-green-600 font-medium mt-1">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 bg-red-200 text-red-800 px-4 py-1 rounded hover:bg-red-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="sm:w-40 w-40 h-40 object-cover rounded border border-gray-300 hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>

            <hr className="my-6 border-gray-300" />
            <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <label htmlFor="discount" className="block text-sm mb-1 text-black">Discount Code</label>
              <div className="flex-grow">
                <input
                  id="discount"
                  type="text"
                  placeholder="Enter code"
                  className="w-full p-2 rounded bg-white bg-opacity-80 text-black border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Apply
              </button>
            </div>
            <p className="text-black text-sm text-right">Estimated delivery: 3-5 business days</p>

            <div className="mt-6 text-right text-xl font-semibold text-blue-700">
              Total: ${calculateTotal()}
            </div>
            {cart.length > 0 && (
              <div className="text-right mt-4">
                <Link to="/checkout">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-2 rounded text-white shadow-md hover:shadow-xl transition">
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