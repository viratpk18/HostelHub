import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student", // default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only allow registration for students
    if (formData.role !== "student") {
      setError("Only students can register");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", formData);
      alert("Registration successful.");
      navigate("../Dashboard/Student");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        
        <select
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="warden">Warden</option>
        </select>

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
          placeholder="Password"
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button type="submit">Register</button>
        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
