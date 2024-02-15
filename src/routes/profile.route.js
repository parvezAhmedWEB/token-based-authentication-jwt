const { getProfile } = require("../controllers/profile.controller");

const router = require("express").Router();

router.get("/", getProfile);

module.exports = router;
