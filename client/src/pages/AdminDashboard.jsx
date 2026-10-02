import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCard from "../components/DashboardCard";

import "../styles/Dashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
    }
  };

  if (!stats) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <div className="dashboard-grid">
            <DashboardCard
              title="Total Users"
              value={stats.totalUsers}
              color="#2563EB"
            />

            <DashboardCard
              title="Doctors"
              value={stats.totalDoctors}
              color="#16A34A"
            />

            <DashboardCard
              title="Patients"
              value={stats.totalPatients}
              color="#F97316"
            />

            <DashboardCard
              title="Appointments"
              value={stats.totalAppointments}
              color="#7C3AED"
            />

            <DashboardCard
              title="Pending"
              value={stats.pendingAppointments}
              color="#EAB308"
            />

            <DashboardCard
              title="Confirmed"
              value={stats.confirmedAppointments}
              color="#14B8A6"
            />

            <DashboardCard
              title="Completed"
              value={stats.completedAppointments}
              color="#0EA5E9"
            />

            <DashboardCard
              title="Cancelled"
              value={stats.cancelledAppointments}
              color="#DC2626"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;