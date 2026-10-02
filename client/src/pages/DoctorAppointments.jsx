import { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/DoctorAppointments.css";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await api.get("/appointments/doctor");

      setAppointments(res.data.data || []);
    } catch (err) {
      console.log(err);

      alert("Unable to load appointments");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(
        `/appointments/${id}/status`,
        { status }
      );

      alert(res.data.message);

      loadAppointments();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Status update failed"
      );
    }
  };

  return (
    <div className="doctor-appointments">

      <h1>My Appointments</h1>

      {appointments.length === 0 ? (

        <div className="empty">
          No Appointments Available
        </div>

      ) : (

        <table>

          <thead>

            <tr>
              <th>Patient</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map((appointment) => (

              <tr key={appointment._id}>

                <td>
                  {appointment.patient?.firstName}{" "}
                  {appointment.patient?.lastName}
                </td>

                <td>
                  {appointment.patient?.phone}
                </td>

                <td>
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {appointment.appointmentTime}
                </td>

                <td>
                  {appointment.reason}
                </td>

                <td>
                  <span
                    className={`status ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td>

                  <button
                    className="approve"
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
                    className="reject"
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
                    className="complete"
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

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default DoctorAppointments;