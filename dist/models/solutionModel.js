"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const problemModel_1 = __importDefault(require("./problemModel"));
const userModel_1 = __importDefault(require("./userModel"));
class Solution extends sequelize_1.Model {
}
Solution.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    language: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    problemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: problemModel_1.default,
            key: 'id',
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'Solution',
    tableName: 'solutions',
    timestamps: true,
});
exports.default = Solution;
//# sourceMappingURL=solutionModel.js.map