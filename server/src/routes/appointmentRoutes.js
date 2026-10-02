const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppointment,
  myAppointments,
  doctorAppointments,
  changeAppointmentStatus,
  allAppointments,
} = require("../controllers/appointmentController");

// ==========================
// Admin - All Appointments
// ==========================
router.get("/", authMiddleware, allAppointments);

// ==========================
// Patient
// ==========================
router.post("/", authMiddleware, createAppointment);

router.get("/my", authMiddleware, myAppointments);

// ==========================
// Doctor
// ==========================
router.get("/doctor", authMiddleware, doctorAppointments);

router.put("/:id/status", authMiddleware, changeAppointmentStatus);

module.exports = router;