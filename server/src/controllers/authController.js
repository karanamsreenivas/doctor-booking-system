const {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
} = require("../services/authService");

// ==========================
// Register
// ==========================
const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login
// ==========================
const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get My Profile
// ==========================
const myProfile = async (req, res) => {
  try {
    const user = await getMyProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update My Profile
// ==========================
const editProfile = async (req, res) => {
  try {
    const user = await updateMyProfile(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  myProfile,
  editProfile,
};