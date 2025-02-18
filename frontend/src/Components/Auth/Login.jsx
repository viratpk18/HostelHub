import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ role: "" , email: "", password: "",});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("User logged in successfully!");

      // Navigate to the respective dashboard based on the role
      switch (formData.role) {
        case "student":
          navigate("../Dashboard/Student"); // Correct path for Student
          break;
        case "staff":
          navigate("../Dashboard/Staff"); // Correct path for Staff
          break;
        case "warden":
          navigate("../Dashboard/Warden"); // Correct path for Warden
          break;
        case "admin":
          navigate("../Dashboard/Admin"); // Correct path for Admin
          break;
        default:
          alert("Invalid role selected!");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="flex-column">
          <div className="inputForm">
            <i className="fa-solid fa-user-tie" id="role-icon"></i>
            <select
              name="role"
              id="role"
              className="input"
              required
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="warden">Warden</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
        <div>
          <p>
            New Student <a href="/register">Register</a>
          </p>
          <p>
            Forgot your password? <a href="/reset-password">Reset Password</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
