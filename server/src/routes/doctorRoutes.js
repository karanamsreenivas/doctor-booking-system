const express = require("express");
const router = express.Router();

const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

// GET All Doctors
router.get("/", getDoctors);

// ADD Doctor
router.post("/", addDoctor);

// UPDATE Doctor
router.put("/:id", updateDoctor);

// DELETE Doctor
router.delete("/:id", deleteDoctor);

module.exports = router;