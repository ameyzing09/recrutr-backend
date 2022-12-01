require("dotenv").config();
const http = require("http");

const userApp = require("./lib/userApp");
const sequelize = require("./db/dbConfig");

const logger = require("./lib/logger")("app.js");

const PORT = process.env.PORT || 8080;

async function startBackendServer() {
  try {
    await sequelize.init();
    logger.info("Database connection successful");
  } catch (error) {
    logger.error("Error connecting to the database : ", error);
    throw error;
  }
}

startBackendServer()

userApp.initialiseBackendServer();
http
  .createServer(userApp.app)
  .listen(PORT, () => logger.info(`Backend server started at port ${PORT}`));

app.listen(PORT, () => logger.info(`Backend server started at port ${PORT}`))