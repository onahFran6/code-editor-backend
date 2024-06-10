"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCase = exports.Solution = exports.Attempt = exports.Problem = exports.User = exports.sequelize = exports.Sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const db_1 = __importDefault(require("../config/db"));
exports.sequelize = db_1.default;
const userModel_1 = __importDefault(require("./userModel"));
exports.User = userModel_1.default;
const problemModel_1 = __importDefault(require("./problemModel"));
exports.Problem = problemModel_1.default;
const attemptModel_1 = __importDefault(require("./attemptModel"));
exports.Attempt = attemptModel_1.default;
const solutionModel_1 = __importDefault(require("./solutionModel"));
exports.Solution = solutionModel_1.default;
const testCasesModel_1 = __importDefault(require("./testCasesModel"));
exports.TestCase = testCasesModel_1.default;
//# sourceMappingURL=index.js.map