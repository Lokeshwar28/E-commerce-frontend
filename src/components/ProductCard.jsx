import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 border border-gray-300 hover:from-slate-200 hover:to-white">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-52 object-cover rounded-md border border-gray-100"
        />
        <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;