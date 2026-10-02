const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Get All Doctors
const getAllDoctors = async () => {
  return await User.find({ role: "doctor" }).select("-password");
};

// Add Doctor
const createDoctor = async (doctorData) => {
  const existingDoctor = await User.findOne({
    email: doctorData.email,
  });

  if (existingDoctor) {
    throw new Error("Doctor already exists");
  }

  const hashedPassword = await bcrypt.hash(
    doctorData.password,
    10
  );

  const doctor = await User.create({
    ...doctorData,
    password: hashedPassword,
    role: "doctor",
  });

  return doctor;
};

// Update Doctor
const updateDoctorById = async (id, doctorData) => {
  const doctor = await User.findById(id);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  if (doctorData.password) {
    doctorData.password = await bcrypt.hash(
      doctorData.password,
      10
    );
  } else {
    delete doctorData.password;
  }

  Object.assign(doctor, doctorData);

  await doctor.save();

  return doctor;
};

// Delete Doctor
const deleteDoctorById = async (id) => {
  const doctor = await User.findById(id);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  await User.findByIdAndDelete(id);

  return true;
};

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
};