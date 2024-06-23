import mongoose from 'mongoose';
import * as schemas from './schemas/index.js';

mongoose.connect('mongodb://localhost:27017/db-best-courses');

const Role = mongoose.model('roles', schemas.role);
const User = mongoose.model('users', schemas.user);
const Lesson = mongoose.model('lessons', schemas.lesson);
const Course = mongoose.model('courses', schemas.course);

const models = {
  Role,
  User,
  Lesson,
  Course,
};

export { models };
