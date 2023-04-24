import dotenv from "dotenv";
import { createServer } from "http";

import userApp from "./lib/userApp.js";

import useLogger from "./lib/logger.js";
const logger = useLogger("app.js");

dotenv.config();

const PORT = process.env.PORT || 8080;

userApp.initialiseBackendServer();
createServer(userApp.app)
  .listen(PORT, () => logger.info(`Backend server started at port ${PORT}`));
