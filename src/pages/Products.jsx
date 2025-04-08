import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../intercept";
import { API_BASE } from "../config";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (

    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800 px-6 py-12 font-sans tracking-wide leading-relaxed">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900 tracking-tight">
        All Products
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 p-6 flex flex-col items-center justify-between border border-gray-200"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Products;