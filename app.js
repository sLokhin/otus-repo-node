/* eslint-disable no-unused-vars */
import express from 'express';
import path from 'node:path';
import createHttpError from 'http-errors';

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

app.use((req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
