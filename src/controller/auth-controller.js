const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generate-token");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Email is connected to other account ",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    user = new UserModel({
      email,
      password: hashedpassword,
    });

    await user.save();
    const accessToken = generateToken({ id: user._id });

    return res.status(201).json({
      success: true,
      message: "created user successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `Duplicate field: ${duplicateField} already exists`,
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred while registering the user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "User not found",
      });
    }

    if (email === user.email && password === user.password) {
      const accessToken = generateToken({ id: user._id });
      return res.status(200).json({
        success: true,
        message: "user logged in Successfully ",
        accessToken,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
