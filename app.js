/* eslint-disable no-unused-vars */
import * as fs from 'node:fs';
import https from 'node:https';
import express from 'express';
import path from 'node:path';
import createHttpError from 'http-errors';
import morgan from 'morgan';

import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
import signupRouter from './routes/signup.js';
import indexRouter from './routes/index.js';
import rolesRouter from './routes/roles.js';
import usersRouter from './routes/users.js';
import coursesRouter from './routes/courses.js';

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;

// Read SSL certificate and key files
const credentials = {
  key: fs.readFileSync(
    path.join(__dirname, '/certificates/localhost-key.pem'),
    'utf8'
  ),
  cert: fs.readFileSync(
    path.join(__dirname, '/certificates/localhost.pem'),
    'utf8'
  ),
};

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/logs/access.log'),
  {
    encoding: 'utf8',
    flags: 'a',
  }
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(morgan('common', { stream: accessLogStream }));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/api/roles', rolesRouter.apiRouter);
app.use('/users', usersRouter.viewRouter);
app.use('/api/users', usersRouter.apiRouter);
app.use('/courses', coursesRouter.viewRouter);
app.use('/api/courses', coursesRouter.apiRouter);

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

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
