const User = require("../models/User");

// ==========================
// Get All Users
// ==========================
const getAllUsers = async () => {
  return await User.find().select("-password");
};

// ==========================
// Delete User
// ==========================
const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  return true;
};

module.exports = {
  getAllUsers,
  deleteUser,
};