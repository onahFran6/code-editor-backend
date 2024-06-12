import request from 'supertest';
import app from '../../app';
import { sequelize } from '../../models';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync all models
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/apis/v1/users/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      'message',
      'User registered successfully',
    );
    expect(response.body.data).toHaveProperty('userId');
  });

  it('should not register a user with missing fields', async () => {
    const response = await request(app).post('/apis/v1/users/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      // Missing email and password
    });

    expect(response.status).toBe(400);
  });

  it('should not register a user with an already registered email', async () => {
    // First, register the user
    await request(app).post('/apis/v1/users/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    // Attempt to register again with the same email
    const response = await request(app).post('/apis/v1/users/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Email already registered.',
    );
  });

  it('should login an existing user', async () => {
    // First, register the user
    await request(app).post('/apis/v1/users/register').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    // Then, login the user
    const response = await request(app).post('/apis/v1/users/login').send({
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('firstName', 'Jane');
    expect(response.body).toHaveProperty('lastName', 'Doe');
  });

  it('should not login with incorrect email', async () => {
    const response = await request(app).post('/apis/v1/users/login').send({
      email: 'invalid@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password',
    );
  });

  it('should not login with incorrect password', async () => {
    // First, register the user
    await request(app).post('/apis/v1/users/register').send({
      firstName: 'Jake',
      lastName: 'Smith',
      email: 'jake.smith@example.com',
      password: 'password123',
    });

    // Attempt to login with incorrect password
    const response = await request(app).post('/apis/v1/users/login').send({
      email: 'jake.smith@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password',
    );
  });
});
