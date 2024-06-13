import express from 'express';
import { UserRepository } from '../classes/index.js';

const router = express.Router();

const userRepository = new UserRepository();

router.get('/', (req, res) => {
  res.send('Login page');
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    res.status(401).send('Login page: Please enter both username and password');
  } else {
    userRepository.getAll().filter((user) => {
      if (user.name === name && user.password === password) {
        const loggedInUser = userRepository.login(name);
        res.status(202).json(loggedInUser);
      }
    });
    res.status(404).send('Login page: User not found');
  }
});

export default router;
