require("dotenv").config("../.env");
const dev = {
  app: {
    port: process.env.PORT || 8000,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://localhost:27017/userDB",
  },
  token: {
    key: process.env.SECRET_KEY || "this_is_token_secret_key",
  },
};
module.exports = dev;
