const {
  getProfile,
  updateProfile,
} = require("../services/profileService");

// Get Logged-in User Profile
const profile = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Logged-in User Profile
const update = async (req, res) => {
  try {
    const user = await updateProfile(req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
  profile,
  update,
};