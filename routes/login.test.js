import express from 'express';
import request from 'supertest';
import loginRouter from './login.js';

const app = express();
app.use(express.json());
app.use('/login', loginRouter);

describe('Login page', () => {
  it('check if username is not entered', async () => {
    const response = await request(app).post('/login').send({
      password: 'password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({});
  });

  it('check if password is not entered', async () => {
    const response = await request(app).post('/login').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({});
  });

  it('check if user not found', async () => {
    const response = await request(app).post('/login').send({
      name: 'New User',
      password: 'password',
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it('check successful login', async () => {
    await request(app).post('/api/users').send({
      name: 'New User',
      password: 'password',
      email: 'newuser@example.com',
    });

    const response = await request(app).post('/login').send({
      name: 'New User',
      password: 'password',
    });

    expect(response.status).toBe(202);
    expect(response.body).toEqual({});
  });
});
