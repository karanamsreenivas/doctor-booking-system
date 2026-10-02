import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserMd,
  FaUser
} from "react-icons/fa";

import "../styles/DoctorDashboard.css";

function DoctorDashboard() {
  return (
    <div className="doctor-dashboard">

      <div className="doctor-header">
        <h1>Doctor Dashboard</h1>
        <p>Manage your appointments efficiently</p>
      </div>

      <div className="doctor-cards">

        <Link
          to="/doctor/appointments"
          className="doctor-card"
        >
          <FaCalendarCheck className="doctor-icon" />

          <h2>Appointments</h2>

          <p>
            View and manage appointments
          </p>
        </Link>

        <Link
          to="/profile"
          className="doctor-card"
        >
          <FaUser className="doctor-icon" />

          <h2>Profile</h2>

          <p>
            View your profile
          </p>
        </Link>

        <div className="doctor-card">

          <FaUserMd className="doctor-icon" />

          <h2>Patients</h2>

          <p>
            Total patients assigned
          </p>

        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;