import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE } from "../config";


const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/products/${id}`)
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
    <div className="w-screen min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded shadow">
        <img src={product.image_url} alt={product.name} className="w-full h-64 sm:h-80 object-cover rounded" />
        <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-300 mt-2">${Number(product.price).toFixed(2)}</p>
        <p className="text-gray-400 mt-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;