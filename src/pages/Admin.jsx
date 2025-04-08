import React, { useState, useEffect } from "react";
import API from "../intercept";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE } from "../config";
import { motion } from "framer-motion";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image_url: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch all products for admin view
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(`${API_BASE}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        await API.put(`${API_BASE}/products/${editProductId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product updated successfully!");
      } else {
        await API.post(`${API_BASE}/products`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Product added successfully!");
      }

      setForm({ name: "", price: "", description: "", image_url: "" });
      setIsEditing(false);
      setEditProductId(null);

      const res = await API.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error saving product", error);
      toast.error("Failed to save product.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`${API_BASE}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error("Failed to delete the product.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 via-blue-200 to-blue-300 px-4 sm:px-6 lg:px-8 py-10 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-center mb-2">{isEditing ? "Edit Product" : "Add Product"}</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-800"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-800"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-800"
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-800"
            required
          />
          {form.image_url && (
            <div className="mt-2 text-center">
              <img
                src={form.image_url}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mx-auto border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-1">Image Preview</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 text-gray-800"
        />

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center mb-4">Product List</h3>
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div>
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 bg-white p-4 rounded-lg shadow flex items-center gap-6"
                  >
                    <div>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-28 h-28 object-cover rounded border border-gray-300"
                      />
                      <p className="font-semibold">{product.name}</p>
                      <p>${product.price}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setForm({
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            image_url: product.image_url,
                          });
                          setIsEditing(true);
                          setEditProductId(product.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-blue-400 hover:text-blue-500 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setShowModal(true);
                        }}
                        className="text-red-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </motion.div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  handleDelete(selectedProductId);
                  setShowModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
