const router = require("express").Router();
const authenticate = require("../middlewares/auth.middleware");
const homeRoute = require("./base.route");
const userRoute = require("./user.route");
const profileRoute = require("./profile.route");

router.use("/", homeRoute);
router.use("/api/v1", userRoute);
router.use("/profile", authenticate, profileRoute);

module.exports = router;
