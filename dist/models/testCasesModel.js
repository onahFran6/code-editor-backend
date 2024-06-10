"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const problemModel_1 = __importDefault(require("./problemModel"));
class TestCase extends sequelize_1.Model {
}
TestCase.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    input: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    output: {
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    sequelize: index_1.sequelize,
    modelName: 'TestCase',
    tableName: 'testCases',
});
exports.default = TestCase;
//# sourceMappingURL=testCasesModel.js.map