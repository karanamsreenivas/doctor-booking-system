const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getUsers,
  removeUser,
  dashboardStats,
} = require("../controllers/adminController");

const {
  getAppointments,
  updateAppointmentStatus,
} = require("../controllers/adminAppointmentController");

// ==========================
// Users
// ==========================

// Get All Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getUsers
);

// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  removeUser
);

// ==========================
// Appointments
// ==========================

// Get All Appointments
router.get(
  "/appointments",
  authMiddleware,
  adminMiddleware,
  getAppointments
);

// Update Appointment Status
router.put(
  "/appointments/:id/status",
  authMiddleware,
  adminMiddleware,
  updateAppointmentStatus
);

// ==========================
// Dashboard
// ==========================

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  dashboardStats
);

module.exports = router;