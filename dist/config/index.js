"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const development = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DB_HOST: process.env.DB_HOST || "127.0.0.1",
    DB_USER: process.env.DB_USER || "root",
    DB_PASS: process.env.DB_PASS || "root",
    DB_DIALECT: process.env.DB_DIALECT || "mysql2",
    DB_NAME: process.env.DB_NAME || "tvz-db",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secreti",
    JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || "1h",
};
const test = {
    PORT: parseInt(process.env.TEST_PORT, 10) || 3000,
    DB_HOST: process.env.TEST_DB_HOST || "127.0.0.1",
    DB_USER: process.env.TEST_DB_USER || "root",
    DB_PASS: process.env.TEST_DB_PASS || "root",
    DB_DIALECT: process.env.TEST_DB_DIALECT || "mysql",
    DB_NAME: process.env.TEST_DB_NAME || "tvz-db",
    JWT_SECRET: process.env.TEST_JWT_SECRET || "your_jwt_secret",
    JWT_TOKEN_EXPIRE: process.env.TEST_JWT_TOKEN_EXPIRE || "1h",
};
const production = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DB_HOST: process.env.DB_HOST || "127.0.0.1",
    DB_USER: process.env.DB_USER || "root",
    DB_PASS: process.env.DB_PASS || "root",
    DB_DIALECT: process.env.DB_DIALECT || "mysql",
    DB_NAME: process.env.DB_NAME || "tvz-db",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || "1h",
};
let config;
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
exports.default = config;
//# sourceMappingURL=index.js.map