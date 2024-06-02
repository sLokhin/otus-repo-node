import express from 'express';
import { User, UserRepository } from '../classes/index.js';

const viewRouter = express.Router();
const apiRouter = express.Router();

const userRepository = new UserRepository();

viewRouter.get('/', (req, res) => {
  res.send('View router: respond with a resource');
});

apiRouter.get('/', (req, res) => {
  res.send('API router: respond with a resource');
});

apiRouter.get('/all', (req, res) => {
  res.json(userRepository.getAll());
});

apiRouter.get('/:id', (req, res) => {
  const user = userRepository.getById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send(`${req.params.id} User not found`);
  }
});

apiRouter.post('/', (req, res) => {
  const newUser = new User(
    null,
    req.body.password,
    req.body.name,
    req.body.email
  );
  const createdUser = userRepository.create(newUser);
  res.status(201).json(createdUser);
});

apiRouter.put('/:id', (req, res) => {
  const updatedUser = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };
  const user = userRepository.update(parseInt(req.params.id), updatedUser);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

apiRouter.delete('/:id', (req, res) => {
  const user = userRepository.delete(parseInt(req.params.id));
  if (user) {
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

const usersRouter = { viewRouter, apiRouter };
export default usersRouter;
