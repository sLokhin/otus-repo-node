import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('User logged out.');
  res.redirect('/login');
});

export default router;
