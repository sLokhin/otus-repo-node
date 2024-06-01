import express from 'express';
import path from 'node:path';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter.viewRouter);
app.use('/api/users', usersRouter.apiRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
