"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const customError_1 = require("../utils/customError");
const utils_1 = require("../utils");
const passwordUtil_1 = require("../utils/passwordUtil");
const registerUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstName, lastName, email, password, }) {
    if (!firstName || !lastName || !email || !password) {
        throw new customError_1.ValidationError('First name, last name, email, and password are required.');
    }
    const existingUser = yield userModel_1.default.findOne({ where: { email } });
    if (existingUser) {
        throw new customError_1.ValidationError('Email already registered.');
    }
    const hashedPassword = yield (0, passwordUtil_1.hashPassword)({ password });
    const accessToken = (0, utils_1.generateAccessToken)({ email });
    const user = yield userModel_1.default.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accessToken,
    });
    return { userId: user.id, accessToken };
});
exports.registerUser = registerUser;
const loginUser = (_b) => __awaiter(void 0, [_b], void 0, function* ({ email, password, }) {
    if (!email || !password) {
        throw new customError_1.ValidationError('Email and password are required');
    }
    const user = yield userModel_1.default.findOne({ where: { email } });
    if (!user) {
        throw new customError_1.UnauthorizedError('Invalid email or password');
    }
    const validPassword = yield (0, passwordUtil_1.comparePassword)({
        password,
        hashedPassword: user.password,
    });
    if (!validPassword) {
        throw new customError_1.UnauthorizedError('Invalid email or password');
    }
    const accessToken = (0, utils_1.generateAccessToken)({ email });
    return {
        token: accessToken,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    };
});
exports.loginUser = loginUser;
//# sourceMappingURL=userService.js.map