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
exports.uploadImagesAndReturnUrls = exports.getUserAttemptDetails = exports.getUserStats = exports.getUserById = exports.getUsersWithStats = exports.getUsersWithStatsOld = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const customError_1 = require("../utils/customError");
const utils_1 = require("../utils");
const passwordUtil_1 = require("../utils/passwordUtil");
const models_1 = require("../models");
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
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
        email: user.email,
        role: user.role,
    };
});
exports.loginUser = loginUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    });
    return users;
});
exports.getUsers = getUsers;
const getUsersWithStatsOld = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    });
    const userStatsPromises = users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const attempts = yield models_1.Attempt.findAll({
            where: { userId: user.id },
            attributes: ['status'],
        });
        const totalAttempts = attempts.length;
        const successfulAttempts = attempts.filter((attempt) => attempt.status === 'success').length;
        const failedAttempts = attempts.filter((attempt) => attempt.status === 'fail').length;
        return Object.assign(Object.assign({}, user.toJSON()), { totalAttempts,
            successfulAttempts,
            failedAttempts });
    }));
    const usersWithStats = yield Promise.all(userStatsPromises);
    return usersWithStats;
});
exports.getUsersWithStatsOld = getUsersWithStatsOld;
const getUsersWithStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.findAll({
        where: { role: 'user' },
        attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
        raw: true,
    });
    const userIds = users.map((user) => user.id);
    const attempts = yield models_1.Attempt.findAll({
        where: { userId: userIds },
        attributes: ['userId', 'status'],
        raw: true,
    });
    const userStats = users.map((user) => {
        const userAttempts = attempts.filter((attempt) => attempt.userId === user.id);
        const totalAttempts = userAttempts.length;
        const successfulAttempts = userAttempts.filter((attempt) => attempt.status === 'success').length;
        const failedAttempts = userAttempts.filter((attempt) => attempt.status === 'fail').length;
        return Object.assign(Object.assign({}, user), { totalAttempts,
            successfulAttempts,
            failedAttempts });
    });
    return userStats;
});
exports.getUsersWithStats = getUsersWithStats;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByPk(userId, {
        attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture'],
    });
    return user;
});
exports.getUserById = getUserById;
const getUserStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const attempts = yield models_1.Attempt.findAll({
        where: { userId },
        attributes: ['id', 'status'],
    });
    const totalAttempts = attempts.length;
    const successfulAttempts = attempts.filter((attempt) => attempt.status === 'success').length;
    const failedAttempts = attempts.filter((attempt) => attempt.status === 'fail').length;
    const successRatio = totalAttempts > 0 ? successfulAttempts / totalAttempts : 0;
    const failRatio = totalAttempts > 0 ? failedAttempts / totalAttempts : 0;
    const stats = {
        totalAttempts,
        successfulAttempts,
        failedAttempts,
        successRatio,
        failRatio,
    };
    return stats;
});
exports.getUserStats = getUserStats;
const getUserAttemptDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const attempts = yield models_1.Attempt.findAll({
        where: { userId },
        include: [{ model: models_1.Problem, as: 'problem' }],
        order: [['createdAt', 'DESC']],
    });
    return attempts;
});
exports.getUserAttemptDetails = getUserAttemptDetails;
const uploadImagesAndReturnUrls = (_c) => __awaiter(void 0, [_c], void 0, function* ({ rawFiles, }) {
    try {
        const userImage = rawFiles['profileImage'][0];
        const { path } = userImage;
        const result = yield cloudinaryConfig_1.default.uploader.upload(path);
        const imageUrl = result.secure_url;
        return imageUrl;
    }
    catch (error) {
        throw new Error('Error uploading image');
    }
});
exports.uploadImagesAndReturnUrls = uploadImagesAndReturnUrls;
//# sourceMappingURL=userService.js.map