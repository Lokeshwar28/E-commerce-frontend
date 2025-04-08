import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../intercept";
import { useCart } from "../context/CartContext";
import { API_BASE } from "../config";



const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`${API_BASE}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Product not found:", err));
  }, [id]);

  if (!product) return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const handleAddToCart = () => {
    console.log("🛒 Button clicked");
    addToCart(product);
  };

  return (
 
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black px-4 py-10">
      <div className="max-w-2xl mx-auto p-6 bg-white/90 text-gray-900 rounded-lg border border-gray-200 shadow-xl">
        <img src={product.image_url} alt={product.name} className="w-full aspect-square object-cover rounded-lg border border-gray-200 shadow-sm" />
        <h2 className="text-4xl font-bold mt-4 text-gray-800">{product.name}</h2>
        <p className="text-2xl font-semibold mt-2 text-emerald-400">${Number(product.price).toFixed(2)}</p>
        <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-full text-white hover:scale-105 hover:brightness-110 transition transform duration-200 shadow-lg"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;