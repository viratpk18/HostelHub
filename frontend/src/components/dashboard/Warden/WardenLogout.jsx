import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WardenLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear student session data
    localStorage.removeItem("wardenToken");
    localStorage.removeItem("wardenData");

    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging Out...</h2>
      <p>You will be redirected to the login page shortly.</p>
      <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." />
    </div>
  );
};

export default WardenLogout;
