import request from 'supertest';
import app from '../../app';
import User from '../../models/userModel';
import { generateAccessToken } from '../../utils';
import { sequelize } from '../../models';
import Problem from '../../models/problemModel';

let userToken: string;
let userId: number;
let problemId: number;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync all models

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

  // Create a problem
  const problem = await Problem.create({
    id: 1,
    title: 'Sample Problem',
    description: 'This is a sample problem',
    difficulty: 'Easy',
    status: 'Published',
  });
  problemId = problem.id;
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

describe('Attempt Endpoints', () => {
  let attemptId: number;

  it('should create a new attempt', async () => {
    const response = await request(app)
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
  });

  it('should retrieve an attempt by ID', async () => {
    const response = await request(app)
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
  });

  it('should retrieve attempts by problem ID', async () => {
    const response = await request(app)
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
  });
});
