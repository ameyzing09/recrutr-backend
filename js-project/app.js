require("dotenv").config();
const http = require("http");

require("./db/dbConfig");
const userApp = require("./lib/userApp");

const logger = require("./lib/logger")("app.js");

const PORT = process.env.PORT || 8080;

userApp.initialiseBackendServer();
http
  .createServer(userApp.app)
  .listen(PORT, () => logger.info(`Backend server started at port ${PORT}`));
