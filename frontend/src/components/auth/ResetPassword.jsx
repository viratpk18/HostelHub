import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });

      alert(response.data.message || "Password reset successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="reset-password-container">
      {/* Header */}
      <header className="header0d">
        <Link to="/" className="logo0d">HostelHub</Link>
        <nav>
          <Link to="/login" className="login-button-da">Login</Link>
        </nav>
      </header>

      {/* Reset Password Form */}
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer0d">
        © 2025 HostelHub. All rights reserved.
      </footer>
    </div>
  );
};

export default ResetPassword;
