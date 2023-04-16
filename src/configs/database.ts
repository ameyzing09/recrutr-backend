import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config()

interface DBConfig {
  port: number;
  poolMax: number;
  poolMin: number;
  poolAcquire?: number;
  poolIdle?: number;
}

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_CONFIG } = process.env;
const dbConfig = JSON.parse(DB_CONFIG as string) as DBConfig;

const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
  host: DB_HOST as string,
  port: dbConfig.port,
  dialect: "mysql",
  pool: {
    max: dbConfig.poolMax,
    min: dbConfig.poolMin,
  },
  define: {
    freezeTableName: true,
  },
  logging: true,
  models: [__dirname + '/src/app/models/**/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

try {
  await sequelize.authenticate()
  console.info("Database connection has been established succesfully")
} catch (err) {
  console.error("Error while connecting to the DB : ", err)
}