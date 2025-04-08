import React, { useState, useEffect } from "react";
import API from "../intercept";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE } from "../config";


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
    <div className="w-screen min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-center mb-2">{isEditing ? "Edit Product" : "Add Product"}</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
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
                  <div
                    key={product.id}
                    className="mb-4 bg-gray-700 p-4 rounded shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-32 h-32 object-cover mb-2 rounded"
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
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-md max-w-sm w-full">
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
