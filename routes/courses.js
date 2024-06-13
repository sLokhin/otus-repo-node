import express from 'express';
import { Course, CourseRepository } from '../classes/index.js';

const viewRouter = express.Router();
const apiRouter = express.Router();

const courseRepository = new CourseRepository();

viewRouter.get('/', (req, res) => {
  res.send('Course view router: respond with a resource');
});

apiRouter.get('/', (req, res) => {
  res.send('Course API router: respond with a resource');
});

apiRouter.get('/all', (req, res) => {
  res.json(courseRepository.getAll());
});

apiRouter.get('/:id', (req, res) => {
  const course = courseRepository.getById(parseInt(req.params.id));
  if (course) {
    res.json(course);
  } else {
    res.status(404).send(`${req.params.id} course not found`);
  }
});

apiRouter.post('/', (req, res) => {
  const newCourse = new Course(
    null,
    req.body.name,
    req.body.description,
    req.body.tags
  );
  const createdCourse = courseRepository.create(newCourse);
  res.status(201).json(createdCourse);
});

apiRouter.put('/:id', (req, res) => {
  const updatedCourse = {
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
  };
  const course = courseRepository.update(
    parseInt(req.params.id),
    updatedCourse
  );
  if (course) {
    res.json(course);
  } else {
    res.status(404).send('Course not found');
  }
});

apiRouter.delete('/:id', (req, res) => {
  const course = courseRepository.delete(parseInt(req.params.id));
  if (course) {
    res.status(204).send();
  } else {
    res.status(404).send('Course not found');
  }
});

const coursesRouter = { viewRouter, apiRouter };
export default coursesRouter;
