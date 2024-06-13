"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// problemModel.ts
const sequelize_1 = require("sequelize");
const index_1 = require("./index"); // Import sequelize instance
const solutionModel_1 = __importDefault(require("./solutionModel")); // Import Solution model
const testCasesModel_1 = __importDefault(require("./testCasesModel"));
const codeSnippetModel_1 = __importDefault(require("./codeSnippetModel"));
class Problem extends sequelize_1.Model {
}
Problem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    difficulty: {
        type: sequelize_1.DataTypes.ENUM('Easy', 'Medium', 'Hard'),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Draft', 'Published'),
        allowNull: false,
        defaultValue: 'Draft',
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'Problem',
    tableName: 'problems',
});
// Define associations after calling init
Problem.hasMany(testCasesModel_1.default, { as: 'testCases', foreignKey: 'problemId' });
Problem.hasMany(solutionModel_1.default, { as: 'solutions', foreignKey: 'problemId' });
Problem.hasMany(codeSnippetModel_1.default, { as: 'codeSnippets', foreignKey: 'problemId' });
exports.default = Problem;
//# sourceMappingURL=problemModel.js.map