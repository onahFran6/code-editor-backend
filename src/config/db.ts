// src/db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import config from ".";

dotenv.config();

const dbLogging =
  process.env.NODE_ENV === "development" || process.env.LOG === "true";

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    logging: dbLogging,
    dialect: config.DB_DIALECT as any,
    dialectModule: require('mysql2')
  }
);

export default sequelize;
