const express = require("express");
const app = express();
const { notFoundHandler, errorHandler } = require("../utility/error");

// global middleware
app.use(require("../src/middlewares/global.middleware"));

// routes
app.use(require("../src/routes/index.route"));

// error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
