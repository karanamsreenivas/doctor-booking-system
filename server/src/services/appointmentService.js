const Appointment = require("../models/Appointment");
const User = require("../models/User");

// ==========================
// Book Appointment
// ==========================
const bookAppointment = async (userId, appointmentData) => {
  const { doctorId, appointmentDate, appointmentTime, reason } = appointmentData;

  const patient = await User.findById(userId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const doctor = await User.findById(doctorId);
  if (!doctor || doctor.role !== "doctor") {
    throw new Error("Doctor not found");
  }

  return await Appointment.create({
    patient: userId,
    doctor: doctorId,
    appointmentDate,
    appointmentTime,
    reason,
  });
};

// ==========================
// Patient Appointments
// ==========================
const getMyAppointments = async (userId) => {
  return await Appointment.find({ patient: userId })
    .populate(
      "doctor",
      "firstName lastName specialization hospital consultationFee"
    )
    .sort({ appointmentDate: 1 });
};

// ==========================
// Doctor Appointments
// ==========================
const getDoctorAppointments = async (doctorId) => {
  return await Appointment.find({ doctor: doctorId })
    .populate(
      "patient",
      "firstName lastName phone email profileImage"
    )
    .sort({ appointmentDate: 1 });
};

// ==========================
// Update Appointment Status
// ==========================
const updateAppointmentStatus = async (
  doctorId,
  appointmentId,
  status
) => {
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.doctor.toString() !== doctorId) {
    throw new Error("You are not authorized");
  }

  appointment.status = status;

  await appointment.save();

  return appointment;
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};