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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
let adminToken;
let userToken;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.sync({ force: true }); // Sync all models
    // Generate access tokens
    adminToken = (0, utils_1.generateAccessToken)({ email: 'admin@example.com' });
    userToken = (0, utils_1.generateAccessToken)({ email: 'user@example.com' });
    // Create an admin user
    yield userModel_1.default.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'password123', // Assuming the password is hashed in the model
        role: 'admin',
        accessToken: adminToken,
    });
    // Create a regular user
    yield userModel_1.default.create({
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com',
        password: 'password123', // Assuming the password is hashed in the model
        role: 'user',
        accessToken: userToken,
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.close(); // Close the database connection
}));
describe('Admin Endpoints', () => {
    it('should retrieve all users with stats', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/apis/v1/admin/users')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
    }));
    it('should retrieve stats for a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/apis/v1/admin/users/2/stats')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('user');
        expect(response.body.data).toHaveProperty('stats');
    }));
    it('should retrieve attempt details for a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/apis/v1/admin/users/2/attempts')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('user');
        expect(response.body.data).toHaveProperty('attempts');
    }));
    it('should not allow a regular user to access admin endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/apis/v1/admin/users')
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'Forbidden');
    }));
    it('should not allow an unauthenticated user to access admin endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/apis/v1/admin/users');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Missing authentication token');
    }));
});
//# sourceMappingURL=admin.test.js.map