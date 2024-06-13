import express from 'express';
import { User, UserRepository } from '../classes/index.js';

const router = express.Router();

const userRepository = new UserRepository();

router.get('/', (req, res) => {
  res.send('Signup page');
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  if (!name || !password || !email) {
    res.status(400).send('Signup page: Fill in all fields');
  } else {
    const newUser = new User(
      null,
      req.body.password,
      req.body.name,
      req.body.email
    );
    const createdUser = userRepository.create(newUser);
    res.status(201).json(createdUser);
  }
});

export default router;
