import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ✅ Import AuthContext
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { updateUserSession } = useAuth(); // ✅ Get updateUserSession from context

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      console.log("📤 Sending login request:", formData);

      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      console.log("✅ Login Success:", response.data);

      localStorage.setItem("token", response.data.token);
      updateUserSession();

      alert("Login successful!");
      navigate(`/dashboard/${formData.role}`);
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <header className="header3">
        <Link to="/" className="header-title">HostelHub</Link>
        <Link to="/register" className="header-register-btn">Register</Link>
      </header>

      <form className="login-form5" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}

        <select name="role" required value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="warden">Warden</option>
          <option value="admin">Admin</option>
        </select>

        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />

        <button type="submit">Login</button>

        <div className="login-links">
          <p>New student? <Link to="/register">Register here</Link></p>
          <p>Forgot password? <Link to="/reset-password">Reset Password</Link></p>
        </div>
      </form>
      {/* Footer */}
      <footer className="footer000">
        <p>&copy; 2025 HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
