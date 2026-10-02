import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    hospital: "",
    address: "",
    about: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/doctor");
      setDoctors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setDoctor({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      specialization: "",
      qualification: "",
      experience: "",
      consultationFee: "",
      hospital: "",
      address: "",
      about: "",
    });

    setEditingId(null);
  };

  const editDoctor = (doc) => {
    setDoctor({
      firstName: doc.firstName || "",
      lastName: doc.lastName || "",
      email: doc.email || "",
      phone: doc.phone || "",
      password: "",
      specialization: doc.specialization || "",
      qualification: doc.qualification || "",
      experience: doc.experience || "",
      consultationFee: doc.consultationFee || "",
      hospital: doc.hospital || "",
      address: doc.address || "",
      about: doc.about || "",
    });

    setEditingId(doc._id);

    setShowModal(true);
  };

  const addDoctor = async () => {
    try {
      const res = await api.post("/doctor", doctor);

      alert(res.data.message);

      setShowModal(false);

      resetForm();

      loadDoctors();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    }
  };

  const updateDoctor = async () => {
    try {
      const res = await api.put(`/doctor/${editingId}`, doctor);

      alert(res.data.message);

      setShowModal(false);

      resetForm();

      loadDoctors();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    }
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/doctor/${id}`);

      alert(res.data.message);

      loadDoctors();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Delete Failed"
      );
    }
  };
    return (
    <div className="doctor-layout">
      <Sidebar />

      <div className="doctor-content">
        <Topbar />

        <div className="doctor-container">
          <div className="doctor-header">
            <h2>Doctors Management</h2>

            <button
              className="add-btn"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              + Add Doctor
            </button>
          </div>

          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Fee</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((d) => (
                <tr key={d._id}>
                  <td>
                    {d.firstName} {d.lastName}
                  </td>

                  <td>{d.email}</td>

                  <td>{d.phone}</td>

                  <td>{d.specialization}</td>

                  <td>{d.experience} Years</td>

                  <td>₹ {d.consultationFee}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editDoctor(d)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteDoctor(d._id)}
                      style={{
                        marginLeft: "10px",
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingId ? "Edit Doctor" : "Add Doctor"}</h2>

            <input
              name="firstName"
              placeholder="First Name"
              value={doctor.firstName}
              onChange={handleChange}
            />

            <input
              name="lastName"
              placeholder="Last Name"
              value={doctor.lastName}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={doctor.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={doctor.phone}
              onChange={handleChange}
            />

            {!editingId && (
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={doctor.password}
                onChange={handleChange}
              />
            )}

            <input
              name="specialization"
              placeholder="Specialization"
              value={doctor.specialization}
              onChange={handleChange}
            />

            <input
              name="qualification"
              placeholder="Qualification"
              value={doctor.qualification}
              onChange={handleChange}
            />

            <input
              name="experience"
              placeholder="Experience"
              value={doctor.experience}
              onChange={handleChange}
            />

            <input
              name="consultationFee"
              placeholder="Consultation Fee"
              value={doctor.consultationFee}
              onChange={handleChange}
            />

            <input
              name="hospital"
              placeholder="Hospital"
              value={doctor.hospital}
              onChange={handleChange}
            />

            <input
              name="address"
              placeholder="Address"
              value={doctor.address}
              onChange={handleChange}
            />

            <textarea
              name="about"
              placeholder="About Doctor"
              value={doctor.about}
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button
                onClick={editingId ? updateDoctor : addDoctor}
              >
                {editingId ? "Update" : "Save"}
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;