const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
} = require("../services/appointmentService");

// ==========================
// Book Appointment
// ==========================
const createAppointment = async (req, res) => {
  try {
    const appointment = await bookAppointment(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Patient Appointments
// ==========================
const myAppointments = async (req, res) => {
  try {
    const appointments = await getMyAppointments(req.user.id);

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Doctor Appointments
// ==========================
const doctorAppointments = async (req, res) => {
  try {
    const appointments = await getDoctorAppointments(req.user.id);

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Status
// ==========================
const changeAppointmentStatus = async (req, res) => {
  try {
    const appointment = await updateAppointmentStatus(
      req.user.id,
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Admin - Get All Appointments
// ==========================
const allAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  myAppointments,
  doctorAppointments,
  changeAppointmentStatus,
  allAppointments,
};