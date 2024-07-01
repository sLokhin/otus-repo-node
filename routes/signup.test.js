import express from 'express';
import request from 'supertest';
import signupRouter from './signup.js';

const app = express();
app.use(express.json());
app.use('/signup', signupRouter);

// describe('Signup page', () => {
//   it('check if username is not entered', async () => {
//     const response = await request(app).post('/signup').send({
//       password: 'password',
//       email: 'john@example.com',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({});
//   });

//   it('check if password is not entered', async () => {
//     const response = await request(app).post('/signup').send({
//       name: 'John Doe',
//       email: 'john@example.com',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({});
//   });

//   it('check if email is not entered', async () => {
//     const response = await request(app).post('/signup').send({
//       name: 'John Doe',
//       password: 'password',
//     });

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({});
//   });

//   it('check successful signup', async () => {
//     const response = await request(app).post('/signup').send({
//       name: 'New User',
//       password: 'password',
//       email: 'newuser@example.com',
//     });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.name).toBe('New User');
//     expect(response.body.password).toBe('password');
//     expect(response.body.email).toBe('newuser@example.com');
//     expect(response.body.status).toBe('created');
//   });
// });
