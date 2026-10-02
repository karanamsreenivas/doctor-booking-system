const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================
// Register User
// ==========================
const registerUser = async (userData) => {
  const { firstName, lastName, email, password, phone, role } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role,
  });

  return user;
};

// ==========================
// Login User
// ==========================
const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

// ==========================
// Get Logged-in User
// ==========================
const getMyProfile = async (userId) => {
  return await User.findById(userId).select("-password");
};

// ==========================
// Update Logged-in User
// ==========================
const updateMyProfile = async (
  userId,
  profileData
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.firstName =
    profileData.firstName || user.firstName;

  user.lastName =
    profileData.lastName || user.lastName;

  user.phone =
    profileData.phone || user.phone;

  await user.save();

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
};