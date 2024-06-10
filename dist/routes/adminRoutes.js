"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/users', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('admin'), adminController_1.getUsersController);
router.get('/users/:userId/stats', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('admin'), adminController_1.getUserStatsController);
router.get('/users/:userId/attempts', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('admin'), adminController_1.getUserAttemptDetailsController);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map