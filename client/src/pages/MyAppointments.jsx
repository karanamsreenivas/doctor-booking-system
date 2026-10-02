import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await api.get("/appointments/my");

      setAppointments(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointments-page">

      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>View all your booked appointments.</p>
      </div>

      {loading ? (
        <div className="loading">
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <div className="empty-card">
          <h2>No Appointments Yet</h2>
          <p>
            Book an appointment with a doctor to see it
            here.
          </p>
        </div>
      ) : (
        <div className="appointment-grid">
          {appointments.map((appointment) => (
            <div
              className="appointment-card"
              key={appointment._id}
            >
              <div className="doctor-avatar">
                👨‍⚕️
              </div>

              <div className="appointment-info">
                <h2>
                  Dr. {appointment.doctor?.firstName}{" "}
                  {appointment.doctor?.lastName}
                </h2>

                <p>
                  <strong>Specialization:</strong>{" "}
                  {appointment.doctor?.specialization}
                </p>

                <p>
                  <strong>Hospital:</strong>{" "}
                  {appointment.doctor?.hospital}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {appointment.appointmentTime}
                </p>

                <p>
                  <strong>Reason:</strong>{" "}
                  {appointment.reason}
                </p>

                <span
                  className={`status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;