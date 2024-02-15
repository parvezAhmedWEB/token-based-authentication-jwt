const http = require("http");
const app = require("./app/app");
const server = http.createServer(app);
const chalk = require("chalk");
const PORT = require("./config/config").app.port;
const connectDB = require("./config/db");

server.listen(PORT, async () => {
  console.log(
    chalk.black.bgBlue(`server is  running at http://localhost:${PORT}`)
  );
  await connectDB();
});
