"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=index.js.map