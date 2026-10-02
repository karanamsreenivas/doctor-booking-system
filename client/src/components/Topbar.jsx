import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Topbar.css";

function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="topbar">

      <div>
        <h2>Admin Dashboard</h2>
        <p>Welcome back, Administrator 👋</p>
      </div>

      <button className="logout-btn" onClick={logout}>
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>

    </div>
  );
}

export default Topbar;