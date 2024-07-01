import express from 'express';
import { models } from '../database/DB.js';
const { Lesson, Course } = models;

const apiRouter = express.Router();

async function getAllComments() {
  const commentsFromLessons = await Lesson.find(
    { comments: { $ne: [] } },
    { comments: true, title: true, _id: false }
  );

  const commentsFromCourses = await Course.find(
    { comments: { $ne: [] } },
    { comments: true, title: true, _id: false }
  );

  return {
    lessons: commentsFromLessons,
    courses: commentsFromCourses,
  };
}

function filterCommentsQueryByAuthor(query, name) {
  return query.filter((data) => {
    const filteredComments = data.comments.filter((com) => com.author === name);
    data.comments = filteredComments;
    return filteredComments.length;
  });
}

apiRouter.get('/', async (req, res) => {
  res.send('Comments API router: respond with a resource');
});

apiRouter.get('/all', async (req, res) => {
  try {
    const comments = await getAllComments();

    return res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/author', async (req, res) => {
  try {
    const { name = '' } = req.query;

    if (!name) {
      return res.status(400).send('Empty request');
    }

    const { lessons, courses } = await getAllComments();

    const filteredCommentsFromLessons = filterCommentsQueryByAuthor(
      lessons,
      name
    );

    const filteredCommentsFromCourses = filterCommentsQueryByAuthor(
      courses,
      name
    );

    const comments = {
      lessons: filteredCommentsFromLessons,
      courses: filteredCommentsFromCourses,
    };

    return res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

const commentsRouter = { apiRouter };
export default commentsRouter;
