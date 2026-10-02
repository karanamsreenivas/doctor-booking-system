const Appointment = require("../models/Appointment");

// ==========================
// Get All Appointments
// ==========================
const getAllAppointments = async () => {
  return await Appointment.find()
    .populate(
      "patient",
      "firstName lastName email phone"
    )
    .populate(
      "doctor",
      "firstName lastName specialization hospital"
    )
    .sort({ createdAt: -1 });
};

// ==========================
// Admin Update Appointment Status
// ==========================
const updateAppointmentStatus = async (
  appointmentId,
  status
) => {
  const appointment = await Appointment.findById(
    appointmentId
  );

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.status = status;

  await appointment.save();

  return appointment;
};

module.exports = {
  getAllAppointments,
  updateAppointmentStatus,
};