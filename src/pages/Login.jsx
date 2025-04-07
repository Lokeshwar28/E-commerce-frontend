import { useState } from "react";
import axios from "axios";
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
      const res = await axios.post(`${API_BASE}/auth/login`, form);
  
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
    <div className="w-screen min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;