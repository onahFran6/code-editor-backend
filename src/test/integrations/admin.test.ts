import request from 'supertest';
import app from '../../app';
import User from '../../models/userModel';
import { generateAccessToken } from '../../utils';
import { sequelize } from '../../models';

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sync all models

  // Generate access tokens
  adminToken = generateAccessToken({ email: 'admin@example.com' });
  userToken = generateAccessToken({ email: 'user@example.com' });

  // Create an admin user
  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'password123', // Assuming the password is hashed in the model
    role: 'admin',
    accessToken: adminToken,
  });

  // Create a regular user
  await User.create({
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@example.com',
    password: 'password123', // Assuming the password is hashed in the model
    role: 'user',
    accessToken: userToken,
  });
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection
});

describe('Admin Endpoints', () => {
  it('should retrieve all users with stats', async () => {
    const response = await request(app)
      .get('/apis/v1/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should retrieve stats for a specific user', async () => {
    const response = await request(app)
      .get('/apis/v1/admin/users/2/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('stats');
  });

  it('should retrieve attempt details for a specific user', async () => {
    const response = await request(app)
      .get('/apis/v1/admin/users/2/attempts')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('attempts');
  });

  it('should not allow a regular user to access admin endpoints', async () => {
    const response = await request(app)
      .get('/apis/v1/admin/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden');
  });

  it('should not allow an unauthenticated user to access admin endpoints', async () => {
    const response = await request(app).get('/apis/v1/admin/users');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Missing authentication token',
    );
  });
});
