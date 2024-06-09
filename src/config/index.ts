// src/config.ts
import dotenv from "dotenv";
import { EnvironmentConfig } from "../types/index.type";

dotenv.config();

const development: EnvironmentConfig = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "root",
  DB_DIALECT: process.env.DB_DIALECT || "mysql2",
  DB_NAME: process.env.DB_NAME || "tvz-db",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secreti",
  JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || "1h",
};

const test: EnvironmentConfig = {
  PORT: parseInt(process.env.TEST_PORT as string, 10) || 3000,
  DB_HOST: process.env.TEST_DB_HOST || "127.0.0.1",
  DB_USER: process.env.TEST_DB_USER || "root",
  DB_PASS: process.env.TEST_DB_PASS || "root",
  DB_DIALECT: process.env.TEST_DB_DIALECT || "mysql",
  DB_NAME: process.env.TEST_DB_NAME || "tvz-db",
  JWT_SECRET: process.env.TEST_JWT_SECRET || "your_jwt_secret",
  JWT_TOKEN_EXPIRE: process.env.TEST_JWT_TOKEN_EXPIRE || "1h",
};

const production: EnvironmentConfig = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "root",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",
  DB_NAME: process.env.DB_NAME || "tvz-db",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || "1h",
};

let config: EnvironmentConfig;

switch (process.env.NODE_ENV) {
  case "development":
    config = development;
    break;
  case "test":
    config = test;
    break;
  case "production":
    config = production;
    break;
  default:
    config = development;
    break;
}

export default config;
