"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attemptController_1 = require("../controllers/attemptController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const attemptsValidator_1 = require("../lib/validators/attemptsValidator");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticate, attemptsValidator_1.validateCreateAttempt, attemptController_1.createAttempt);
router.get('/:id', authMiddleware_1.authenticate, attemptsValidator_1.validateAttemptId, attemptController_1.getAttemptById);
router.get('/problem/:problemId', authMiddleware_1.authenticate, attemptsValidator_1.validateProblemId, attemptController_1.getAttemptsByProblemId);
exports.default = router;
//# sourceMappingURL=attemptRoutes.js.map