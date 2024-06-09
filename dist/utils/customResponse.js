"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCustomResponse = void 0;
const sendCustomResponse = ({ res, statusCode, message, data, }) => {
    res.status(statusCode).json({
        status: statusCode >= 200 && statusCode < 300,
        message,
        data,
    });
};
exports.sendCustomResponse = sendCustomResponse;
//# sourceMappingURL=customResponse.js.map