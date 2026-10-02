import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserMd,
} from "react-icons/fa";

import api from "../services/api";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data.user)
      );

      const role = res.data.data.user.role;

      alert("Login Successful");

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="login-page">

      <div className="left-panel">

        <div className="overlay">

          <FaUserMd className="hospital-icon" />

          <h1>Book a Doctor System</h1>

          <p>
            Manage Doctors, Patients and Appointments
            in one secure platform.
          </p>

        </div>

      </div>

      <div className="right-panel">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p>Please login to continue</p>

          <div className="input-box">

            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="input-box">

            <FaLock />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <div
            style={{
              textAlign: "right",
              marginBottom: "15px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#0d6efd",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button onClick={login}>
            Login
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#0d6efd",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;