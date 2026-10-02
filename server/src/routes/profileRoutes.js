const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  profile,
  update,
} = require("../controllers/profileController");

// Get Profile
router.get("/profile", authMiddleware, profile);

// Update Profile
router.put("/profile", authMiddleware, update);

module.exports = router;