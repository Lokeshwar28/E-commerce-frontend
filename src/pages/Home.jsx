import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../intercept";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/products")
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch(() => setError("Failed to load featured products."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-screen min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white py-20 px-6 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-down">Welcome to Shopease</h1>
          <p className="text-lg sm:text-xl mb-6 animate-fade-in-up">Your one-stop shop for the latest tech gadgets</p>
          <Link
            to="/products"
            className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition duration-300 animate-fade-in-up"
          >
            Shop Now
          </Link>
        </div>

        {/* Feature Section */}
        <div className="py-16 px-6 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-xl hover:scale-105 transform transition duration-300">
              <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
              <p>Get your products delivered in no time with our express shipping options.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl hover:scale-105 transform transition duration-300">
              <h3 className="text-xl font-semibold mb-2">🔒 Secure Payments</h3>
              <p>Shop with confidence using our encrypted and secure checkout process.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl hover:scale-105 transform transition duration-300">
              <h3 className="text-xl font-semibold mb-2">⭐ Quality Products</h3>
              <p>We offer only top-rated and trusted tech gear from leading brands.</p>
            </div>
          </div>
        </div>

        {/* Featured Products Preview */}
        <div className="py-16 px-6 bg-white text-center max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Products</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featured.map((product) => (
                <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} />
                  <Link
                    to={`/products/${product.id}`}
                    className="mt-2 inline-block text-sm text-purple-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;