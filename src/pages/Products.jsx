import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { API_BASE } from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/products`)
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-screen min-h-screen bg-black text-white px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;