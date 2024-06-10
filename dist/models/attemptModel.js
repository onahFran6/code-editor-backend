"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const userModel_1 = __importDefault(require("./userModel"));
const problemModel_1 = __importDefault(require("./problemModel"));
class Attempt extends sequelize_1.Model {
}
Attempt.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    language: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('success', 'fail'),
        allowNull: false,
    },
    output: {
        type: sequelize_1.DataTypes.TEXT,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id',
        },
    },
    problemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: problemModel_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'Attempt',
    tableName: 'attempts',
});
Attempt.belongsTo(userModel_1.default, { foreignKey: 'userId', as: 'user' });
Attempt.belongsTo(problemModel_1.default, { foreignKey: 'problemId', as: 'problem' });
exports.default = Attempt;
//# sourceMappingURL=attemptModel.js.map