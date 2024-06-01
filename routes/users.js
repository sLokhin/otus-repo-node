import express from 'express';
const viewRouter = express.Router();
const apiRouter = express.Router();

viewRouter.get('/', (req, res) => {
  res.send('View router: respond with a resource');
});

apiRouter.get('/', (req, res) => {
  res.send('API router: respond with a resource');
});

const usersRouter = { viewRouter, apiRouter };
export default usersRouter;
