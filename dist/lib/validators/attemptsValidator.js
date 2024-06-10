"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProblemId = exports.validateAttemptId = exports.validateGetUserAttempts = exports.validateCreateAttempt = void 0;
const express_validator_1 = require("express-validator");
const language_1 = require("../../constants/language");
exports.validateCreateAttempt = [
    (0, express_validator_1.body)('problemId').isInt().withMessage('Problem ID must be an integer'),
    (0, express_validator_1.body)('code').notEmpty().withMessage('Code is required'),
    (0, express_validator_1.body)('language')
        .isString()
        .withMessage('Language must be a string')
        .isIn(language_1.ALLOWED_LANGUAGES)
        .withMessage(`Language must be one of: ${language_1.ALLOWED_LANGUAGES.join(', ')}`),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateGetUserAttempts = [
    (0, express_validator_1.param)('userId').isInt().withMessage('User ID must be an integer'),
    (0, express_validator_1.param)('problemId').isInt().withMessage('Problem ID must be an integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateAttemptId = [
    (0, express_validator_1.param)('id')
        .notEmpty()
        .withMessage('Attempt ID is required')
        .isInt()
        .withMessage('Attempt ID must be an integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateProblemId = [
    (0, express_validator_1.param)('problemId')
        .notEmpty()
        .withMessage('Problem ID is required')
        .isInt()
        .withMessage('Problem ID must be an integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
//# sourceMappingURL=attemptsValidator.js.map