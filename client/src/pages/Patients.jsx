import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/Doctors.css";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await api.get("/admin/users");

      const patientList = res.data.data.filter(
        (user) => user.role === "patient"
      );

      setPatients(patientList);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to load patients"
      );
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`);

      alert("Patient deleted successfully");

      loadPatients();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Delete failed"
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
            <h2>Patients Management</h2>
          </div>

          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Verified</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>
                      {patient.firstName} {patient.lastName}
                    </td>

                    <td>{patient.email}</td>

                    <td>{patient.phone}</td>

                    <td>
                      {patient.isVerified ? "Yes" : "No"}
                    </td>

                    <td>
                      <button
                        style={{
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          deletePatient(patient._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Patients Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Patients;