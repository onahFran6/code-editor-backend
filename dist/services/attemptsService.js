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
exports.getAttemptsByProblemIdService = exports.getAttemptByIdService = void 0;
const models_1 = require("../models");
const getAttemptByIdService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ attemptId, userId, }) {
    const attempt = yield models_1.Attempt.findByPk(attemptId, {
        attributes: ['id', 'code', 'status', 'output', 'createdAt', 'language'],
        include: [
            {
                model: models_1.Problem,
                as: 'problem',
                attributes: ['id', 'title', 'description', 'difficulty'],
            },
            {
                model: models_1.User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'email'],
            },
        ],
    });
    if (!attempt) {
        return null;
    }
    return Object.assign({}, attempt.toJSON());
});
exports.getAttemptByIdService = getAttemptByIdService;
const getAttemptsByProblemIdService = (_b) => __awaiter(void 0, [_b], void 0, function* ({ problemId, userId, }) {
    const attempts = yield models_1.Attempt.findAll({
        where: { problemId },
        attributes: ['id', 'code', 'status', 'output', 'createdAt', 'language'],
        include: [
            {
                model: models_1.Problem,
                as: 'problem',
                attributes: ['id', 'title', 'description', 'difficulty'],
            },
            {
                model: models_1.User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'email'],
            },
        ],
        order: [['createdAt', 'DESC']],
    });
    return attempts.map((attempt) => (Object.assign({}, attempt.toJSON())));
});
exports.getAttemptsByProblemIdService = getAttemptsByProblemIdService;
//# sourceMappingURL=attemptsService.js.map