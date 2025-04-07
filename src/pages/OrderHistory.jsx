import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="mb-6 border border-gray-700 rounded p-4 bg-gray-900">
              <p className="text-lg font-semibold mb-2">Order #{order.id}</p>
              <p className="text-blue-400 font-medium mb-2">Total: ${Number(order.total).toFixed(2)}</p>
              <ul className="ml-4 list-disc text-gray-300">
                {order.items.map((item, i) => (
                  <li key={i}>
                    <span className="font-semibold">{item.name}</span> — {item.quantity} × ${Number(item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-2">
                Placed on: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
