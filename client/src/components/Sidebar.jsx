import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: "bi-speedometer2",
      path: "/admin",
    },
    {
      name: "Doctors",
      icon: "bi-person-badge",
      path: "/admin/doctors",
    },
    {
      name: "Patients",
      icon: "bi-people",
      path: "/admin/patients",
    },
    {
      name: "Appointments",
      icon: "bi-calendar-check",
      path: "/admin/appointments",
    },
    {
      name: "Profile",
      icon: "bi-person-circle",
      path: "/profile",
    },
  ];

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <i className="bi bi-heart-pulse-fill"></i>
        <h2>Book Doctor</h2>
      </div>

      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li
            key={item.name}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Sidebar;