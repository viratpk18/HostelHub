import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Prevents redirect before user is checked

  const updateUserSession = () => {
    const token = localStorage.getItem("token");
    console.log("🔹 Retrieved token:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("✅ Decoded token:", decoded);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.warn("⚠️ Token expired. Logging out...");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("❌ Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false); // ✅ Now user state is ready
  };

  useEffect(() => {
    updateUserSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, updateUserSession, loading }}>
      {!loading && children} {/* ✅ Ensures app waits for auth check */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
