import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear student session data
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");

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

export default StudentLogout;
