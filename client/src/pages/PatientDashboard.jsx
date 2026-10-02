import { Link } from "react-router-dom";
import {
  FaUser,
  FaCalendarCheck,
  FaUserMd,
} from "react-icons/fa";

import "../styles/PatientDashboard.css";

function PatientDashboard() {
  return (
    <div className="patient-dashboard">

      <div className="patient-header">
        <h1>Patient Dashboard</h1>
        <p>Welcome to Online Doctor Appointment System</p>
      </div>

      <div className="patient-cards">

        <Link
          to="/patient/doctors"
          className="patient-card"
        >
          <FaUserMd className="card-icon" />

          <h2>Doctors</h2>

          <p>Browse available doctors</p>
        </Link>

        <Link
          to="/patient/appointments"
          className="patient-card"
        >
          <FaCalendarCheck className="card-icon" />

          <h2>Appointments</h2>

          <p>View your appointments</p>
        </Link>

        <Link
          to="/profile"
          className="patient-card"
        >
          <FaUser className="card-icon" />

          <h2>Profile</h2>

          <p>Manage your account</p>
        </Link>

      </div>

    </div>
  );
}

export default PatientDashboard;