"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.customErrorHandler = void 0;
const customError_1 = require("../utils/customError");
const logger_1 = __importDefault(require("../utils/logger"));
const customErrorHandler = (err, req, res, next) => {
    if (err instanceof customError_1.CustomError) {
        logger_1.default.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(err.statusCode).json({ message: err.message });
    }
    logger_1.default.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong',
    });
};
exports.customErrorHandler = customErrorHandler;
const notFoundHandler = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorMiddleware.js.map