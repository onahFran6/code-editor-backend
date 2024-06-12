import request from 'supertest';
import app from '../../app';
import User from '../../models/userModel';
import { generateAccessToken } from '../../utils';
import { sequelize } from '../../models';
import Attempt from '../../models/attemptModel';
import Solution from '../../models/solutionModel';
import Problem from '../../models/problemModel';
import TestCase from '../../models/testCasesModel';

let userToken: string;
let adminToken: string;
let userId: number;
let problemId: number;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync all models

  // Create an admin user
  const admin = await User.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'adminpassword123', // Assuming the password is hashed in the model
    role: 'admin',
    accessToken: generateAccessToken({ email: 'admin@example.com' }),
  });

  // Create a regular user
  const user = await User.create({
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@example.com',
    password: 'password123', // Assuming the password is hashed in the model
    role: 'user',
    accessToken: generateAccessToken({ email: 'user@example.com' }),
  });
  userId = user.id;
  userToken = user.accessToken;
  adminToken = admin.accessToken;

  // Create a problem
  const problem = await Problem.create({
    title: 'Sample Problem',
    description: 'This is a sample problem',
    difficulty: 'Easy',
    status: 'Published',
    id: 1,
  });
  problemId = problem.id;

  // Create a test case for the problem
  await TestCase.create({
    problemId: problem.id,
    input: 'Sample input',
    output: 'Sample output',
    id: 1,
  });

  // Create a solution for the problem
  await Solution.create({
    problemId: problem.id,
    userId: user.id,
    language: 'python',
    code: 'print("Hello, World!")',
  });

  // Create an attempt for the problem
  await Attempt.create({
    problemId: problem.id,
    userId: user.id,
    code: 'print("Hello, World!")',
    language: 'python',
    output: 'Hello, World!',
    status: 'success',
  });
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

describe('Problem Endpoints', () => {
  it('should retrieve all problems', async () => {
    const response = await request(app)
      .get('/apis/v1/problems')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Problems retrieved successfully',
    );
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.data[0]).toHaveProperty('title');
    expect(response.body.data[0]).toHaveProperty('description');
    expect(response.body.data[0]).toHaveProperty('difficulty');
  });

  it('should retrieve a specific problem by ID', async () => {
    const response = await request(app)
      .get(`/apis/v1/problems/${problemId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Problem retrieved successfully',
    );
    expect(response.body.data).toHaveProperty('id', problemId);
    expect(response.body.data).toHaveProperty('title', 'Sample Problem');
    expect(response.body.data).toHaveProperty(
      'description',
      'This is a sample problem',
    );
    expect(response.body.data).toHaveProperty('difficulty', 'Easy');
    expect(response.body.data).toHaveProperty('status', 'success'); // Based on the attempt created
  });

  it('should retrieve a problem with test cases and solutions', async () => {
    const response = await request(app)
      .get(`/apis/v1/problems/${problemId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Problem retrieved successfully',
    );
    expect(response.body.data).toHaveProperty('id', problemId);
    expect(response.body.data).toHaveProperty('title', 'Sample Problem');
    expect(response.body.data).toHaveProperty(
      'description',
      'This is a sample problem',
    );
    expect(response.body.data).toHaveProperty('difficulty', 'Easy');
    expect(response.body.data).toHaveProperty('testCases');
    expect(response.body.data.testCases).toBeInstanceOf(Array);
    expect(response.body.data.testCases.length).toBeGreaterThan(0);
    expect(response.body.data.testCases[0]).toHaveProperty(
      'input',
      'Sample input',
    );
    expect(response.body.data.testCases[0]).toHaveProperty(
      'output',
      'Sample output',
    );
    expect(response.body.data).toHaveProperty('solutions');
    expect(response.body.data.solutions).toBeInstanceOf(Array);
    expect(response.body.data.solutions.length).toBeGreaterThan(0);
    expect(response.body.data.solutions[0]).toHaveProperty(
      'language',
      'python',
    );
    expect(response.body.data.solutions[0]).toHaveProperty(
      'code',
      'print("Hello, World!")',
    );
  });
});
