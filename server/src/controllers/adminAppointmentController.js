const {
  getAllAppointments,
  updateAppointmentStatus,
} = require("../services/adminAppointmentService");

// ==========================
// Get All Appointments
// ==========================
const getAppointments = async (req, res) => {
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

// ==========================
// Update Appointment Status
// ==========================
const changeAppointmentStatus = async (req, res) => {
  try {
    const appointment = await updateAppointmentStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAppointments,
  updateAppointmentStatus: changeAppointmentStatus,
};