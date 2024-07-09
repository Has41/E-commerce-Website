// test/index.test.js
import request from 'supertest';
import { app, server } from '../index';
import mongoose from 'mongoose';

beforeAll(async () => {
  // Wait for the server to be ready
  await server;
});

describe('Authentication Tests', () => {
  it('Should log in a user', async () => {
    try {
      console.log('Sending request to /api/auth/login...');
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: '123',
        });

      console.log('Request body:', {
        email: 'test@gmail.com',
        password: '123',
      });
      console.log('Response from /api/auth/login:', response.body);
      console.log('Response headers:', response.headers);
      console.log('Redirected:', response.redirected);
      console.log('Status code:', response.status);

      // Add your assertions based on the expected behavior of the login route
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    } catch (error) {
      console.error('Test failed with error:', error);

      // Re-throw the error to let Jest mark the test as failed
      throw error;
    }
  });
});


afterAll(async () => {
    // Close the server and the database connection
    await server.close();
    await mongoose.connection.close();
  });