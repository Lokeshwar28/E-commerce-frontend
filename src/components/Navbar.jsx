import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded hover:bg-gray-700 ${
        location.pathname === to ? "bg-gray-700 text-blue-400" : "text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white hover:text-blue-400">
          🛒 ShopEase
        </Link>

        {/* Hamburger toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-2 items-center">
          {navLink("/", "Home")}
          {navLink("/products", "Products")}
          {navLink("/cart", `Cart (${cart.length})`)}
          {user && navLink("/orders", "Orders")}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {user && user.role === "admin" && (
            <Link to="/admin">
              <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                Admin Panel
              </button>
            </Link>
          )}

          {!user ? (
            <>
              {navLink("/login", "Login")}
              {navLink("/register", "Register")}
            </>
          ) : (
            <>
              <span className="text-white hidden sm:inline">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-2 text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {navLink("/", "Home")}
          {navLink("/products", "Products")}
          {navLink("/cart", `Cart (${cart.length})`)}
          {user && navLink("/orders", "Orders")}

          {user && user.role === "admin" && (
            <Link to="/admin">
              <button className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                Admin Panel
              </button>
            </Link>
          )}

          {!user ? (
            <>
              {navLink("/login", "Login")}
              {navLink("/register", "Register")}
            </>
          ) : (
            <>
              <span className="block text-white">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="w-full px-3 py-2 text-red-400 hover:text-red-500 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;