import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as schemas from '../database/schemas/index.js';

describe('User API CRUD operations', () => {
  beforeAll(async () => {
    // close existing connection from ../database.DB.js
    await mongoose.disconnect();

    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const mockRole = mongoose.model('roles', schemas.role);
    const mockUser = mongoose.model('users', schemas.user);
    const mockLesson = mongoose.model('lessons', schemas.lesson);
    const mockCourse = mongoose.model('courses', schemas.course);

    jest.mock('../database/DB.js', () => {
      const originalModule = jest.requireActual('../database/DB.js');
      return {
        ...originalModule,
        Role: mockRole,
        User: mockUser,
        Lesson: mockLesson,
        Course: mockCourse,
      };
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  let userId;

  it('should create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      id: 999,
      login: 'johndoe',
      name: 'John Doe',
      password: 'JohnDoePassword',
      email: 'john@example.com',
      role: 'student',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(999);
    expect(response.body.login).toBe('johndoe');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.password).toBe('JohnDoePassword');
    expect(response.body.email).toBe('john@example.com');
    expect(response.body.role).toBe('student');

    userId = response.body.id;
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users/all');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
