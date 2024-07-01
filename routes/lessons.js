import express from 'express';
import { models } from '../database/DB.js';
const { Lesson } = models;

const apiRouter = express.Router();

function calculateRating(vals) {
  const grades = vals.filter((val) => val > 0);

  if (!grades.length) {
    return 0;
  }

  return Number(
    (grades.reduce((acc, val) => acc + val, 0) / grades.length).toFixed(2)
  );
}

apiRouter.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const lessons = await Lesson.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ id: 1 });

    if (!lessons) {
      return res.status(404).send('Lessons not found');
    }

    return res.status(200).send(lessons);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/all', async (req, res) => {
  try {
    const lessons = await Lesson.find();

    if (!lessons) {
      return res.status(404).send('Lessons not found');
    }

    return res.status(200).send(lessons);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await Lesson.findOne({ id });

    if (!item) {
      return res.status(404).send(`${id} lesson not found`);
    }

    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/:id/comments', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await Lesson.findOne({ id });

    if (!item) {
      return res.status(404).send(`${id} lesson not found`);
    }

    res.status(200).send(item.comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/:id/rating', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await Lesson.findOne({ id });

    if (!item) {
      return res.status(404).send(`${id} lesson not found`);
    }

    const comments = item.comments;
    const grades = comments.map((comment) => comment.rating);
    const rating = calculateRating(grades);

    res.status(200).send({ rating });
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.post('/', async (req, res) => {
  try {
    const comments = req.body.comments;
    const grades = comments.map((comment) => comment.rating);
    const item = new Lesson({ ...req.body, rating: calculateRating(grades) });

    if (!item) {
      return res.status(400).send('Lesson not created');
    }

    await item.save();

    return res.status(201).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await Lesson.findOne({ id });

    if (!item) {
      return res.status(404).send(`${id} lesson not found`);
    }

    const comments = [...item.comments];
    const newComments = [...(req.body.comments || [])];

    newComments.forEach((comment) => {
      if (!comments.find((com) => com._id === comment._id)) {
        comments.push(comment);
      }
    });

    const grades = comments.map((comment) => comment.rating);
    const rating = calculateRating(grades);

    const updatedItem = await Lesson.findOneAndUpdate(
      { id },
      { ...req.body, comments, rating },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send(`${id} updated lesson not found`);
    }

    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.patch('/:id/comment', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await Lesson.findOne({ id });

    if (!item) {
      return res.status(404).send(`${id} lesson not found`);
    }

    const comments = [...item.comments];
    const newComment = req.body;

    const newCommentIdx = comments.findIndex((com) => {
      return (
        com.author === newComment.author && com.content === newComment.content
      );
    });

    if (newCommentIdx !== -1) {
      // delete comment
      comments.splice(newCommentIdx, 1);
    } else {
      // add comment
      comments.push(newComment);
    }

    const grades = comments.map((comment) => comment.rating);
    const rating = calculateRating(grades);

    const updatedItem = await Lesson.findOneAndUpdate(
      { id },
      { ...req.body, comments, rating },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send(`${id} updated lesson not found`);
    }

    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await Lesson.deleteOne({ id });

    if (!result || !result.deletedCount) {
      return res.status(404).send(`${id} lesson not found`);
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

const lessonsRouter = { apiRouter };
export default lessonsRouter;
