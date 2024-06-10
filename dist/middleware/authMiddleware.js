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
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customResponse_1 = require("../utils/customResponse");
const userModel_1 = __importDefault(require("../models/userModel"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) {
        return (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 401,
            message: 'Missing authentication token',
        });
    }
    try {
        const decoded = yield verifyToken(accessToken);
        const user = yield userModel_1.default.findOne({ where: { email: decoded.email } });
        if (!user) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 401,
                message: 'Invalid Credentials',
            });
        }
        req.user = { id: user.id, role: user.role };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 401,
                message: 'Invalid access token',
            });
        }
        return (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
});
exports.authenticate = authenticate;
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
const authorize = (role) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 403,
                message: 'Forbidden',
            });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authMiddleware.js.map