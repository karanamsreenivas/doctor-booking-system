const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// =========================
// Middleware
// =========================
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// =========================
// Route Logs
// =========================
console.log("Loading doctorRoutes...");
console.log("Doctor routes registered");

// =========================
// Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Book Doctor API 🚀",
  });
});

// =========================
// 404 Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

module.exports = app;