import { useEffect, useState } from "react";
import API from "../intercept";
import { API_BASE } from "../config";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`${API_BASE}/orders`, {
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
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-300 italic">No orders found yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="mb-6 border border-indigo-700 rounded-xl p-6 bg-gradient-to-tr from-gray-800 to-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300">
              <p className="text-lg font-bold mb-2 tracking-wide uppercase text-yellow-300">Order #{order.id}</p>
              <p className="text-blue-300 text-lg font-semibold mb-3">Total: ${Number(order.total).toFixed(2)}</p>
              <ul className="ml-6 list-disc text-gray-300 space-y-1">
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
