"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyArrayWithoutSpaces = exports.isEqualJson = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateAccessToken = ({ email }) => {
    const token = jsonwebtoken_1.default.sign({ email }, config_1.default.JWT_SECRET, {
        expiresIn: config_1.default.JWT_TOKEN_EXPIRE,
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const isEqualJson = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};
exports.isEqualJson = isEqualJson;
const stringifyArrayWithoutSpaces = (arr) => {
    return `[${arr.join(',')}]`;
};
exports.stringifyArrayWithoutSpaces = stringifyArrayWithoutSpaces;
//# sourceMappingURL=index.js.map