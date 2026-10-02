import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";

import PatientDashboard from "./pages/PatientDashboard";

import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

import PatientDoctors from "./pages/PatientDoctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* ================= Public ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= Admin ================= */}

      <Route path="/admin" element={<AdminDashboard />} />

      <Route
        path="/admin/doctors"
        element={<Doctors />}
      />

      <Route
        path="/admin/patients"
        element={<Patients />}
      />

      <Route
        path="/admin/appointments"
        element={<Appointments />}
      />

      {/* ================= Patient ================= */}

      <Route
        path="/patient"
        element={<PatientDashboard />}
      />

      <Route
        path="/patient/doctors"
        element={<PatientDoctors />}
      />

      <Route
        path="/patient/book/:id"
        element={<BookAppointment />}
      />

      <Route
        path="/patient/appointments"
        element={<MyAppointments />}
      />

      {/* ================= Doctor ================= */}

      <Route
        path="/doctor"
        element={<DoctorDashboard />}
      />

      <Route
        path="/doctor/appointments"
        element={<DoctorAppointments />}
      />

      {/* ================= Profile ================= */}

      <Route
        path="/profile"
        element={<Profile />}
      />
    </Routes>
  );
}

export default App;