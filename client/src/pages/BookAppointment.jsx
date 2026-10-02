import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import "../styles/BookAppointment.css";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/appointments", {
        doctorId: id,
        ...form,
      });

      alert(res.data.message);

      navigate("/patient/appointments");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to book appointment"
      );
    }
  };

  return (
    <div className="booking-page">

      <div className="booking-card">

        <h1>Book Appointment</h1>

        <form onSubmit={bookAppointment}>

          <label>Appointment Date</label>

          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
          />

          <label>Appointment Time</label>

          <input
            type="time"
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={handleChange}
            required
          />

          <label>Reason</label>

          <textarea
            rows="5"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Enter reason"
            required
          />

          <button type="submit">
            Book Appointment
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookAppointment;