import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("❌ Token verification failed:", error.message);
      return res.status(401).json({ message: "Unauthorized, token invalid" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
};

export const authenticateStudent = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from header

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "student") {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};


export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, Admins only" });
  }
};

export const wardenOnly = (req, res, next) => {
  if (req.user && req.user.role === "warden") {
    next(); // ✅ Allow wardens
  } else {
    return res.status(403).json({ message: "Access denied, Wardens only" });
  }
};

// 🟠 **Only Students**
export const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, Students only" });
  }
};