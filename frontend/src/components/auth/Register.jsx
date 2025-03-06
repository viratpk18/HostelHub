import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rollNo: "",  // ✅ Ensure rollNo is added
    role: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.rollNo || !formData.role) {
      setError("All fields are required.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", formData);
      alert("Registration successful.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  // ✅ Ensure return is inside the function
  return (
    <div className="register-container">
      <header className="headersignup">
        <a href="/" className="header-title">HostelHub</a>
        <a href="/login" className="header-login-btn">Login</a>
      </header>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <input
          type="text"
          name="rollNo"
          placeholder="Roll Number"  // ✅ Added rollNo field
          required
          onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
        />

        <select
          name="role"
          required
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="warden">Warden</option>
        </select>

        <button type="submit">Register</button>
        
        <div className="login-link-text">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </form>

      <footer className="footerda">
        <p>© 2025 HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Register; // ✅ Ensure this is included
