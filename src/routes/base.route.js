const { getHome, getHealth } = require("../controllers/base.controller");

const router = require("express").Router();

router.get("/", getHome);
router.get("/health", getHealth);

module.exports = router;
