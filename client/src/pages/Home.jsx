import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            Welcome to Book Doctor
          </span>

          <h1>
            Your Health <br />
            Our Priority
          </h1>

          <p>
            Book appointments with experienced doctors,
            consult specialists, manage medical records,
            and receive quality healthcare from one
            platform.
          </p>

          <div className="hero-buttons">

            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>

          </div>

          <div className="stats">

            <div>
              <h2>100+</h2>
              <span>Doctors</span>
            </div>

            <div>
              <h2>5000+</h2>
              <span>Patients</span>
            </div>

            <div>
              <h2>24/7</h2>
              <span>Support</span>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <img
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
            alt="Doctor"
          />

        </div>

      </section>
    </>
  );
}

export default Home;