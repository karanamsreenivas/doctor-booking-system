import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/Doctors.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      // ADMIN API
      const res = await api.get("/admin/appointments");

      setAppointments(res.data.data);
    } catch (err) {
      console.log("Load Error:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to load appointments"
      );
    }
  };

  const updateStatus = async (id, status) => {
    try {
      // ADMIN API
      const res = await api.put(
        `/admin/appointments/${id}/status`,
        {
          status,
        }
      );

      alert(res.data.message);

      loadAppointments();
    } catch (err) {
      console.log("Update Error:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Status update failed"
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
            <h2>Appointments Management</h2>
          </div>

          <table className="doctor-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>
                      {appointment.patient?.firstName}{" "}
                      {appointment.patient?.lastName}
                    </td>

                    <td>
                      Dr. {appointment.doctor?.firstName}{" "}
                      {appointment.doctor?.lastName}
                    </td>

                    <td>
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </td>

                    <td>{appointment.appointmentTime}</td>

                    <td>
                      <span
                        style={{
                          color:
                            appointment.status === "Confirmed"
                              ? "green"
                              : appointment.status === "Cancelled"
                              ? "red"
                              : appointment.status === "Completed"
                              ? "blue"
                              : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td>{appointment.reason}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Confirmed"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        style={{
                          marginLeft: "8px",
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Cancelled"
                          )
                        }
                      >
                        Reject
                      </button>

                      <button
                        style={{
                          marginLeft: "8px",
                          background: "#198754",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Completed"
                          )
                        }
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Appointments Found
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

export default Appointments;