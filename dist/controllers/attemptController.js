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
exports.getAttemptsByProblemId = exports.getAttemptById = exports.getUserAttempts = exports.createAttempt = void 0;
const models_1 = require("../models");
const judge0Service_1 = require("../services/judge0Service");
const attemptsService_1 = require("../services/attemptsService");
const createAttempt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { problemId, code, language } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const result = yield (0, judge0Service_1.submitCode)(code, language, problemId);
        const status = result.status === 'success' ? 'success' : 'fail';
        const attempt = yield models_1.Attempt.create({
            userId: userId,
            problemId: problemId,
            code,
            language,
            output: result.output,
            status,
        });
        if (status === 'success') {
            // Create a new solution if the attempt is successful
            yield models_1.Solution.create({
                language,
                code,
                userId: userId,
                problemId: problemId,
            });
        }
        res.status(201).json({
            message: 'Attempt submitted',
            attemptId: attempt.id,
            status,
            output: result.output,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAttempt = createAttempt;
const getUserAttempts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const problemId = parseInt(req.params.problemId, 10);
        const attempts = yield models_1.Attempt.findAll({
            where: { userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id, problemId: problemId },
            order: [['createdAt', 'DESC']],
        });
        res.json(attempts);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserAttempts = getUserAttempts;
const getAttemptById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attemptId = parseInt(req.params.id, 10);
        const attempt = yield (0, attemptsService_1.getAttemptByIdService)({ attemptId });
        res.json(attempt);
    }
    catch (error) {
        next(error);
    }
});
exports.getAttemptById = getAttemptById;
const getAttemptsByProblemId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const problemId = parseInt(req.params.problemId, 10);
        const attempts = yield (0, attemptsService_1.getAttemptsByProblemIdService)({
            problemId,
            userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
        });
        res.json(attempts);
    }
    catch (error) {
        next(error);
    }
});
exports.getAttemptsByProblemId = getAttemptsByProblemId;
//# sourceMappingURL=attemptController.js.map