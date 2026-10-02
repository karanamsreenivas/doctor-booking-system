import { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");

      setUser(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load profile");
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put("/auth/profile", user);

      alert(res.data.message);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Profile update failed"
      );
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h1>My Profile</h1>

        <form onSubmit={updateProfile}>

          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />

          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={user.email}
            disabled
          />

          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />

          <button type="submit">
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
}

export default Profile;