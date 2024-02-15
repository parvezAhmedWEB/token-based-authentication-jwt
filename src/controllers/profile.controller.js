const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "I am Private Route.",
  });
};
module.exports = { getProfile };
