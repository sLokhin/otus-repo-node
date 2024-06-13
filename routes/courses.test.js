import express from 'express';
import request from 'supertest';
import coursesRouter from './courses.js';
const { apiRouter } = coursesRouter;

const app = express();
app.use(express.json());
app.use('/api/courses', apiRouter);

describe('Courses API CRUD operations', () => {
  let courseId;

  it('should create a new course', async () => {
    const response = await request(app)
      .post('/api/courses')
      .send({
        name: 'Node.js Developer',
        description: 'Development of server applications on Node.js',
        tags: ['node', 'express', 'mongoDB'],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Node.js Developer');
    expect(response.body.description).toBe(
      'Development of server applications on Node.js'
    );
    expect(response.body.tags).toEqual(['node', 'express', 'mongoDB']);

    courseId = response.body.id;
  });

  it('should get all courses', async () => {
    const response = await request(app).get('/api/courses/all');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a course by ID', async () => {
    const response = await request(app).get(`/api/courses/${courseId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', courseId);
    expect(response.body.name).toBe('Node.js Developer');
    expect(response.body.description).toBe(
      'Development of server applications on Node.js'
    );
    expect(response.body.tags).toEqual(['node', 'express', 'mongoDB']);
  });

  it('should update a course by ID', async () => {
    const response = await request(app)
      .put(`/api/courses/${courseId}`)
      .send({
        name: 'React.js Developer',
        description: 'The most popular JS framework for Frontend development',
        tags: ['react', 'typescript', 'redux'],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', courseId);
    expect(response.body.name).toBe('React.js Developer');
    expect(response.body.description).toBe(
      'The most popular JS framework for Frontend development'
    );
    expect(response.body.tags).toEqual(['react', 'typescript', 'redux']);
  });

  it('should delete a course by ID', async () => {
    const response = await request(app).delete(`/api/courses/${courseId}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to get a deleted course', async () => {
    const response = await request(app).get(`/api/courses/${courseId}`);

    expect(response.status).toBe(404);
  });
});
