const {
  getAllDoctors,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
} = require("../services/doctorService");

// ===============================
// GET ALL DOCTORS
// ===============================
const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// ADD DOCTOR
// ===============================
const addDoctor = async (req, res) => {
  try {
    const doctor = await createDoctor(req.body);

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
      data: doctor,
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// UPDATE DOCTOR
// ===============================
const updateDoctor = async (req, res) => {
  try {
    const doctor = await updateDoctorById(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      data: doctor,
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// DELETE DOCTOR
// ===============================
const deleteDoctor = async (req, res) => {
  try {
    await deleteDoctorById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Doctor Deleted Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};