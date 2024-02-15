const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const key = require("../../config/config").token.key;

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Input filed is not valid",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Already register user.",
      });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User is created successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        roles: newUser.roles,
        accountStatus: newUser.accountStatus,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User is not created.",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Input filed is not valid.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password does not match.",
      });
    }
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accountStatus: user.accountStatus,
    };
    const token = jwt.sign(payload, key, { expiresIn: "5h" });
    return res.status(200).json({
      success: true,
      message: "User login successfully.",
      payload,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User is not login.",
    });
  }
};
module.exports = { createUser, loginUser };
