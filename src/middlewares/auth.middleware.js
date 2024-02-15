const jwt = require("jsonwebtoken");
const key = require("../../config/config").token.key;
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, key);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid Token",
      error: error.message,
    });
  }
};
module.exports = authenticate;
