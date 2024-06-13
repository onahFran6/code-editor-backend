"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const config_1 = __importDefault(require("./config"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const problemRoutes_1 = __importDefault(require("./routes/problemRoutes"));
const attemptRoutes_1 = __importDefault(require("./routes/attemptRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
// Create Express server
const app = (0, express_1.default)();
// Express configuration
app.set('port', config_1.default.PORT);
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.get('/', (req, res) => {
    res.send('Server is healthy');
});
app.use('/apis/v1/users', authRoutes_1.default);
app.use('/apis/v1/problems', problemRoutes_1.default);
app.use('/apis/v1/attempts', attemptRoutes_1.default);
app.use('/apis/v1/admin', adminRoutes_1.default);
// Error handling middleware
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.customErrorHandler);
// Development error handler
if (process.env.NODE_ENV === 'development') {
    app.use((0, errorhandler_1.default)());
}
exports.default = app;
//# sourceMappingURL=app.js.map