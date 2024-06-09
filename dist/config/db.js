"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const _1 = __importDefault(require("."));
dotenv_1.default.config();
const dbLogging = process.env.NODE_ENV === "development" || process.env.LOG === "true";
const sequelize = new sequelize_1.Sequelize(_1.default.DB_NAME, _1.default.DB_USER, _1.default.DB_PASS, {
    host: _1.default.DB_HOST,
    logging: dbLogging,
    dialect: _1.default.DB_DIALECT,
    dialectModule: require('mysql2')
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map