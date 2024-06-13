"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/codeSnippetModel.ts
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const problemModel_1 = __importDefault(require("./problemModel"));
class CodeSnippet extends sequelize_1.Model {
}
CodeSnippet.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    problemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: problemModel_1.default,
            key: 'id',
        },
    },
    language: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    starterCode: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    codeExample: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'CodeSnippet',
    tableName: 'codeSnippets',
});
exports.default = CodeSnippet;
//# sourceMappingURL=codeSnippetModel.js.map