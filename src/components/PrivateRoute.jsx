import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) return <Navigate to="/login" />;  // Redirect to login if no user
  
    // Log the user role to verify it
    console.log("User role:", user.role);
  
    if (adminOnly && user.role !== "admin") return <Navigate to="/" />;  // Redirect non-admins
  
    return children;  // Render children (protected content)
  };

export default PrivateRoute;