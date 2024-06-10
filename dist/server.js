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
const app_1 = __importDefault(require("./app"));
const models_1 = require("./models");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the database
        yield models_1.sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        yield models_1.sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
        // Start Express server
        const server = app_1.default.listen(app_1.default.get('port'), () => {
            console.log(`App is running at http://localhost:${app_1.default.get('port')} in ${app_1.default.get('env')} mode`);
            console.log('Press CTRL-C to stop');
        });
        // Gracefully handle server termination
        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Server terminated');
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
});
startServer();
exports.default = startServer;
//# sourceMappingURL=server.js.map