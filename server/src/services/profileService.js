const User = require("../models/User");

// Get Logged-in User Profile
const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Update Logged-in User Profile
const updateProfile = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    userData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  getProfile,
  updateProfile,
};