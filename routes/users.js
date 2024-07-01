import express from 'express';
import { models } from '../database/DB.js';
const { User } = models;

const viewRouter = express.Router();
const apiRouter = express.Router();

viewRouter.get('/', (req, res) => {
  res.send('Users view router: respond with a resource');
});

apiRouter.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ id: 1 });

    if (!users) {
      return res.status(404).send('Users not found');
    }

    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/all', async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send('Users not found');
    }

    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await User.findOne({ id });

    if (!item) {
      return res.status(404).send(`${id} user not found`);
    }

    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.post('/', async (req, res) => {
  try {
    const item = new User(req.body);

    if (!item) {
      return res.status(400).send('User not created');
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
    const item = await User.findOneAndUpdate({ id }, req.body, { new: true });

    if (!item) {
      return res.status(404).send(`${id} user not found`);
    }

    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.patch('/:id/courses', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await User.findOne({ id });
    const course = req.body.course;

    if (!item) {
      return res.status(404).send(`${id} user not found`);
    }

    if (Array.isArray(course)) {
      return res
        .status(400)
        .send("Wrong params: 'course' should not be an array");
    }

    // delete course
    if (item.courses.indexOf(course) !== -1) {
      const data = await User.findOneAndUpdate(
        { id },
        { $pull: { courses: course } },
        { new: true }
      );

      return res.status(200).send(data);
    }

    // add course
    const data = await User.findOneAndUpdate(
      { id },
      { $push: { courses: course } },
      { new: true }
    );

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await User.deleteOne({ id });

    if (!result || !result.deletedCount) {
      return res.status(404).send(`${id} user not found`);
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

const usersRouter = { viewRouter, apiRouter };
export default usersRouter;
