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
exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const customResponse_1 = require("../utils/customResponse");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = yield (0, userService_1.registerUser)({
            firstName,
            lastName,
            email,
            password,
        });
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 201,
            message: 'User registered successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, userService_1.loginUser)({ email, password });
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map