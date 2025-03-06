import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to Login Page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to HostelHub</h1>
        <p>Your all-in-one hostel management solution.</p>
        <button className="cta-button75" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose HostelHub?</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Easy Booking</h3>
            <p>Seamlessly book and manage hostel rooms online.</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Fast and secure payment processing for hassle-free transactions.</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>Our team is available round the clock to assist you.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          HostelHub is a modern hostel management system that streamlines
          operations and enhances efficiency for hostel administrators.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer5">
        <p>&copy; 2025 HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
