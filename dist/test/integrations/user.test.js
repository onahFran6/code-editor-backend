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
const models_1 = require("../../models");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.sync({ force: true }); // Sync all models
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.close(); // Close the database connection
}));
describe('Auth Endpoints', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/register').send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
        expect(response.body.data).toHaveProperty('userId');
    }));
    it('should not register a user with missing fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/register').send({
            firstName: 'Jane',
            lastName: 'Doe',
            // Missing email and password
        });
        expect(response.status).toBe(400);
    }));
    it('should not register a user with an already registered email', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, register the user
        yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/register').send({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
        });
        // Attempt to register again with the same email
        const response = yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/register').send({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email already registered.');
    }));
    it('should login an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, register the user
        yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/register').send({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
        });
        // Then, login the user
        const response = yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/login').send({
            email: 'jane.doe@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('userId');
        expect(response.body).toHaveProperty('firstName', 'Jane');
        expect(response.body).toHaveProperty('lastName', 'Doe');
    }));
    it('should not login with incorrect email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/login').send({
            email: 'invalid@example.com',
            password: 'password123',
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid email or password');
    }));
    it('should not login with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, register the user
        yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/register').send({
            firstName: 'Jake',
            lastName: 'Smith',
            email: 'jake.smith@example.com',
            password: 'password123',
        });
        // Attempt to login with incorrect password
        const response = yield (0, supertest_1.default)(app_1.default).post('/apis/v1/users/login').send({
            email: 'jake.smith@example.com',
            password: 'wrongpassword',
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid email or password');
    }));
});
//# sourceMappingURL=user.test.js.map