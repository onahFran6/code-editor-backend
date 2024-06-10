"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authValidator_1 = require("../lib/validators/authValidator");
const router = express_1.default.Router();
router.post('/register', authValidator_1.validateRegistration, authController_1.register);
router.post('/login', authValidator_1.validateLogin, authController_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map