import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "../styles/PatientDoctors.css";

function PatientDoctors() {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/doctor");

      setDoctors(res.data.data);
    } catch (err) {
      console.log(err);

      alert("Unable to load doctors");
    }
  };

  return (
    <div className="patient-doctors">

      <div className="doctor-page-title">
        <h1>Available Doctors</h1>
        <p>Select a doctor to book an appointment.</p>
      </div>

      <div className="doctor-grid">

        {doctors.map((doctor) => (

          <div
            className="doctor-card"
            key={doctor._id}
          >

            <div className="doctor-image">
              👨‍⚕️
            </div>

            <h2>
              Dr. {doctor.firstName} {doctor.lastName}
            </h2>

            <p>
              <strong>Specialization</strong>
              <br />
              {doctor.specialization || "General"}
            </p>

            <p>
              <strong>Hospital</strong>
              <br />
              {doctor.hospital || "Not Available"}
            </p>

            <p>
              <strong>Experience</strong>
              <br />
              {doctor.experience} Years
            </p>

            <p>
              <strong>Consultation Fee</strong>
              <br />
              ₹ {doctor.consultationFee}
            </p>

            <button
              className="book-btn"
              onClick={() =>
                navigate(`/patient/book/${doctor._id}`)
              }
            >
              Book Appointment
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PatientDoctors;