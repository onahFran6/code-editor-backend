"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const problemController_1 = require("../controllers/problemController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// GET /api/problems - Get all problems
router.get('/', problemController_1.getProblems);
router.get('/problem/:id', problemController_1.getProblem);
router.get('/:id', authMiddleware_1.authenticate, problemController_1.getProblemWithTests);
// You can add more routes here, such as:
// GET /api/problems/:id - Get a specific problem by ID
// POST /api/problems - Create a new problem (admin only)
// PUT /api/problems/:id - Update a problem (admin only)
// DELETE /api/problems/:id - Delete a problem (admin only)
exports.default = router;
//# sourceMappingURL=problemRoutes.js.map