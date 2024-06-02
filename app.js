/* eslint-disable no-unused-vars */
import * as fs from 'node:fs';
import express from 'express';
import path from 'node:path';
import createHttpError from 'http-errors';
import morgan from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;

const app = express();

console.log('aaaa ', path.join(__dirname, './logs/access.log'));
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/logs/access.log'),
  {
    encoding: 'utf8',
    flags: 'a',
  }
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('common', { stream: accessLogStream }));

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
