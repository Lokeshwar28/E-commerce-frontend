import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-gray-800 p-4 rounded shadow hover:shadow-xl hover:scale-105 transform transition duration-300">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-3 text-lg font-semibold text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-300 mt-1">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;