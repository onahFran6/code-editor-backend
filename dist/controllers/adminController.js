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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAttemptDetailsController = exports.getUserStatsController = exports.getUsersController = void 0;
const userService_1 = require("../services/userService");
const customResponse_1 = require("../utils/customResponse");
const getUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWithStats = yield (0, userService_1.getUsersWithStats)();
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 200,
            message: 'Users retrieved successfully',
            data: usersWithStats,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsersController = getUsersController;
const getUserStatsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = yield (0, userService_1.getUserById)(userId);
        if (!user) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 404,
                message: 'User not found',
            });
        }
        const stats = yield (0, userService_1.getUserStats)(userId);
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 200,
            message: 'User stats retrieved successfully',
            data: { user, stats },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserStatsController = getUserStatsController;
const getUserAttemptDetailsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = yield (0, userService_1.getUserById)(userId);
        if (!user) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 404,
                message: 'User not found',
            });
        }
        const attempts = yield (0, userService_1.getUserAttemptDetails)(userId);
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 200,
            message: 'User attempt details retrieved successfully',
            data: { user, attempts },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserAttemptDetailsController = getUserAttemptDetailsController;
//# sourceMappingURL=adminController.js.map