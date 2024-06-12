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
const attemptModel_1 = __importDefault(require("../../models/attemptModel"));
const solutionModel_1 = __importDefault(require("../../models/solutionModel"));
const problemModel_1 = __importDefault(require("../../models/problemModel"));
const testCasesModel_1 = __importDefault(require("../../models/testCasesModel"));
let userToken;
let adminToken;
let userId;
let problemId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.sync({ force: true }); // Sync all models
    // Create an admin user
    const admin = yield userModel_1.default.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'adminpassword123', // Assuming the password is hashed in the model
        role: 'admin',
        accessToken: (0, utils_1.generateAccessToken)({ email: 'admin@example.com' }),
    });
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
    adminToken = admin.accessToken;
    // Create a problem
    const problem = yield problemModel_1.default.create({
        title: 'Sample Problem',
        description: 'This is a sample problem',
        difficulty: 'Easy',
        status: 'Published',
        id: 1,
    });
    problemId = problem.id;
    // Create a test case for the problem
    yield testCasesModel_1.default.create({
        problemId: problem.id,
        input: 'Sample input',
        output: 'Sample output',
        id: 1,
    });
    // Create a solution for the problem
    yield solutionModel_1.default.create({
        problemId: problem.id,
        userId: user.id,
        language: 'python',
        code: 'print("Hello, World!")',
    });
    // Create an attempt for the problem
    yield attemptModel_1.default.create({
        problemId: problem.id,
        userId: user.id,
        code: 'print("Hello, World!")',
        language: 'python',
        output: 'Hello, World!',
        status: 'success',
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.sequelize.close(); // Close the database connection
}));
describe('Problem Endpoints', () => {
    it('should retrieve all problems', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/apis/v1/problems')
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Problems retrieved successfully');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.data[0]).toHaveProperty('id');
        expect(response.body.data[0]).toHaveProperty('title');
        expect(response.body.data[0]).toHaveProperty('description');
        expect(response.body.data[0]).toHaveProperty('difficulty');
    }));
    it('should retrieve a specific problem by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/apis/v1/problems/${problemId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Problem retrieved successfully');
        expect(response.body.data).toHaveProperty('id', problemId);
        expect(response.body.data).toHaveProperty('title', 'Sample Problem');
        expect(response.body.data).toHaveProperty('description', 'This is a sample problem');
        expect(response.body.data).toHaveProperty('difficulty', 'Easy');
        expect(response.body.data).toHaveProperty('status', 'success'); // Based on the attempt created
    }));
    it('should retrieve a problem with test cases and solutions', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/apis/v1/problems/${problemId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Problem retrieved successfully');
        expect(response.body.data).toHaveProperty('id', problemId);
        expect(response.body.data).toHaveProperty('title', 'Sample Problem');
        expect(response.body.data).toHaveProperty('description', 'This is a sample problem');
        expect(response.body.data).toHaveProperty('difficulty', 'Easy');
        expect(response.body.data).toHaveProperty('testCases');
        expect(response.body.data.testCases).toBeInstanceOf(Array);
        expect(response.body.data.testCases.length).toBeGreaterThan(0);
        expect(response.body.data.testCases[0]).toHaveProperty('input', 'Sample input');
        expect(response.body.data.testCases[0]).toHaveProperty('output', 'Sample output');
        expect(response.body.data).toHaveProperty('solutions');
        expect(response.body.data.solutions).toBeInstanceOf(Array);
        expect(response.body.data.solutions.length).toBeGreaterThan(0);
        expect(response.body.data.solutions[0]).toHaveProperty('language', 'python');
        expect(response.body.data.solutions[0]).toHaveProperty('code', 'print("Hello, World!")');
    }));
});
//# sourceMappingURL=problem.test.js.map