const getHome = (_req, res) => {
  res.status(200).send(`<h1>Welcome to the server</h1>`);
};
const getHealth = (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Ok",
  });
};
module.exports = { getHome, getHealth };
