import { useState } from "react";
import API from "../intercept";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
        const res = await API.post("/auth/login", form); // No need for API_BASE if axios already has baseURL;
  
      if (res.data.token) {
        console.log("Login response:", res.data);  // Log the response
  
        // Save user and token in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));  // Save user with role
        localStorage.setItem("token", res.data.token);  // Save the JWT token
  
        // Set the user data in context (if you're using context to manage auth state)
        login(res.data.user, res.data.token);  // Assuming you have the `login` function in context
  
        navigate("/");  // Redirect to homepage or desired page
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-900 via-fuchsia-700 to-pink-600 text-white flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 rounded-xl shadow-2xl border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;