import User from "../models/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userFound.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default isAdmin;
