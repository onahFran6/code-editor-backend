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
exports.getProblemWithTestsById = exports.getProblemById = exports.getAllProblems = void 0;
const models_1 = require("../models");
const solutionModel_1 = __importDefault(require("../models/solutionModel"));
const getAllProblems = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    const problems = yield models_1.Problem.findAll({
        attributes: ['id', 'title', 'description', 'difficulty'],
    });
    if (userId) {
        const userAttempts = yield models_1.Attempt.findAll({
            where: { userId },
            attributes: ['problemId', 'status'],
        });
        const problemsWithStatus = problems.map((problem) => {
            var _a;
            const attemptStatus = (_a = userAttempts.find((attempt) => attempt.problemId === problem.id)) === null || _a === void 0 ? void 0 : _a.status;
            return Object.assign(Object.assign({}, problem.toJSON()), { status: attemptStatus || '' });
        });
        return problemsWithStatus;
    }
    return problems.map((problem) => (Object.assign(Object.assign({}, problem.toJSON()), { status: '' })));
});
exports.getAllProblems = getAllProblems;
const getProblemById = (_b) => __awaiter(void 0, [_b], void 0, function* ({ problemId, userId, }) {
    const problem = yield models_1.Problem.findByPk(problemId);
    if (!problem) {
        return null;
    }
    if (userId) {
        const attempt = yield models_1.Attempt.findOne({
            where: { userId, problemId },
            attributes: ['status'],
        });
        return Object.assign(Object.assign({}, problem.toJSON()), { status: (attempt === null || attempt === void 0 ? void 0 : attempt.status) || '' });
    }
    return Object.assign(Object.assign({}, problem.toJSON()), { status: '' });
});
exports.getProblemById = getProblemById;
const getProblemWithTestsById = (_c) => __awaiter(void 0, [_c], void 0, function* ({ problemId, userId, }) {
    const problem = yield models_1.Problem.findOne({
        where: { id: problemId, status: 'Published' },
        attributes: ['id', 'title', 'description', 'difficulty'],
        include: [
            {
                model: solutionModel_1.default,
                as: 'solutions',
                attributes: ['id', 'language', 'code'],
                include: [
                    {
                        model: models_1.User,
                        as: 'user',
                        attributes: ['firstName', 'lastName', 'email'],
                    },
                ],
            },
            {
                model: models_1.TestCase,
                as: 'testCases',
                attributes: ['id', 'input', 'output'],
            },
        ],
    });
    if (!problem) {
        return null;
    }
    if (userId) {
        const attempt = yield models_1.Attempt.findOne({
            where: { userId, problemId },
            attributes: ['status'],
        });
        return Object.assign(Object.assign({}, problem.toJSON()), { status: (attempt === null || attempt === void 0 ? void 0 : attempt.status) || '' });
    }
    return Object.assign(Object.assign({}, problem.toJSON()), { status: '' });
});
exports.getProblemWithTestsById = getProblemWithTestsById;
//# sourceMappingURL=problemService.js.map