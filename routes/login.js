import express from 'express';
import { UserRepository } from '../classes/index.js';

const router = express.Router();

const userRepository = new UserRepository();

router.get('/', (req, res) => {
  res.send('Login page');
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(401).send('Login page: Please enter both username and password');
  } else {
    userRepository.getAll().filter((user) => {
      if (user.username === username && user.password === password) {
        res
          .status(202)
          .send(`Login page: Username: ${username} --- Password: ${password}`);
      }
    });
    res.status(404).send('Login page: User not found');
  }
});

export default router;
