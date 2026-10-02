const User = require("../models/User");
const Appointment = require("../models/Appointment");

const getDashboardStats = async () => {
  const totalUsers = await User.countDocuments();

  const totalDoctors = await User.countDocuments({
    role: "doctor",
  });

  const totalPatients = await User.countDocuments({
    role: "patient",
  });

  const totalAdmins = await User.countDocuments({
    role: "admin",
  });

  const totalAppointments = await Appointment.countDocuments();

  const pendingAppointments = await Appointment.countDocuments({
    status: "Pending",
  });

  const confirmedAppointments = await Appointment.countDocuments({
    status: "Confirmed",
  });

  const completedAppointments = await Appointment.countDocuments({
    status: "Completed",
  });

  const cancelledAppointments = await Appointment.countDocuments({
    status: "Cancelled",
  });

  return {
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAdmins,
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    completedAppointments,
    cancelledAppointments,
  };
};

module.exports = {
  getDashboardStats,
};