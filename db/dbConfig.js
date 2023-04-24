import dotenv from "dotenv";
import Sequelize from "sequelize";
import useLogger from "../lib/logger.js";

const logger = useLogger("sequelize.js");
dotenv.config();

const getDBConfig = async () => {
  if (
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_PASSWORD &&
    process.env.DB_CONFIG
  ) {
    return {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_CONFIG: process.env.DB_CONFIG,
      DB_NAME: process.env.DB_NAME,
    };
  }
  return;
  // TODO: code for DB creds taken from AWS, Azure, Google Cloud
};


const dbConfig = await getDBConfig();
logger.info("DB Configuration fetch sucessfully");
const monitorDBConfig = JSON.parse(dbConfig.DB_CONFIG);

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: "mysql",
    pool: {
      max: monitorDBConfig.poolMax,
      min: monitorDBConfig.poolMin,
    },
    define: {
      freezeTableName: true,
    },
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  logger.info("Database authenticated successfully");
} catch(err) {
  logger.error("There was error in authenticating the database connection ", err);
}

export default sequelize;
