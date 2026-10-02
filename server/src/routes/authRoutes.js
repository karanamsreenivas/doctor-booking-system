const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  register,
  login,
  myProfile,
  editProfile,
} = require("../controllers/authController");

// ==========================
// Public Routes
// ==========================
router.post("/register", register);

router.post("/login", login);

// ==========================
// Protected Routes
// ==========================
router.get("/me", authMiddleware, myProfile);

router.put("/profile", authMiddleware, editProfile);

module.exports = router;