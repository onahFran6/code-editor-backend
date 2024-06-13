"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getProblemWithTests = exports.getProblem = exports.getProblems = void 0;
const customResponse_1 = require("../utils/customResponse");
const problemService = __importStar(require("../services/problemService"));
const getProblems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const problemscahed = `problemscahed`;
        // const redisData = await fetchDataFromRedis({
        //   redisUniqueId: problemscahed,
        // });
        // if (redisData) {
        //   console.log('Data found in Redis cache');
        //   sendCustomResponse({
        //     res,
        //     statusCode: 200,
        //     message: 'Problems retrieved successfully',
        //     data: redisData,
        //   });
        //   return;
        // }
        const problems = yield problemService.getAllProblems({ userId });
        // await setDataToRedis({ redisUniqueId: problemscahed, data: problems });
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 200,
            message: 'Problems retrieved successfully',
            data: problems,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProblems = getProblems;
const getProblem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const problemId = parseInt(req.params.id, 10);
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const problem = yield problemService.getProblemById({ problemId, userId });
        if (!problem) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 404,
                message: 'Problem not found',
            });
        }
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 200,
            message: 'Problem retrieved successfully',
            data: problem,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProblem = getProblem;
const getProblemWithTests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const problemId = parseInt(req.params.id, 10);
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const problem = yield problemService.getProblemWithTestsById({
            problemId,
            userId,
        });
        if (!problem) {
            return (0, customResponse_1.sendCustomResponse)({
                res,
                statusCode: 404,
                message: 'Problem not found',
            });
        }
        (0, customResponse_1.sendCustomResponse)({
            res,
            statusCode: 200,
            message: 'Problem retrieved successfully',
            data: problem,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProblemWithTests = getProblemWithTests;
//# sourceMappingURL=problemController.js.map