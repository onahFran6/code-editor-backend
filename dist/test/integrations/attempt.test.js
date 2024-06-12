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
const problemModel_1 = __importDefault(require("../../models/problemModel"));
let userToken;
let userId;
let problemId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.sync({ force: true }); // Sync all models
    // Create a regular user
    const user = yield userModel_1.default.create({
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com',
        password: 'password123', // Assuming the password is hashed in the model
        role: 'user',
        accessToken: (0, utils_1.generateAccessToken)({ email: 'user@example.com' }),
    });
    userId = user.id;
    userToken = user.accessToken;
    // Create a problem
    const problem = yield problemModel_1.default.create({
        id: 1,
        title: 'Sample Problem',
        description: 'This is a sample problem',
        difficulty: 'Easy',
        status: 'Published',
    });
    problemId = problem.id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.close(); // Close the database connection
}));
describe('Attempt Endpoints', () => {
    let attemptId;
    it('should create a new attempt', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/apis/v1/attempts')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            problemId,
            code: 'print("Hello, World!")',
            language: 'python',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Attempt submitted');
        expect(response.body).toHaveProperty('attemptId');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('output');
        attemptId = response.body.attemptId;
    }));
    it('should retrieve an attempt by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/apis/v1/attempts/${attemptId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', attemptId);
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('output');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('language');
        expect(response.body).toHaveProperty('problem');
        expect(response.body).toHaveProperty('user');
    }));
    it('should retrieve attempts by problem ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/apis/v1/attempts/problem/${problemId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('code');
        expect(response.body[0]).toHaveProperty('status');
        expect(response.body[0]).toHaveProperty('output');
        expect(response.body[0]).toHaveProperty('createdAt');
        expect(response.body[0]).toHaveProperty('language');
        expect(response.body[0]).toHaveProperty('problem');
        expect(response.body[0]).toHaveProperty('user');
    }));
});
//# sourceMappingURL=attempt.test.js.map