import express from 'express';
import { models } from '../database/DB.js';
const { Role } = models;

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Roles API router: respond with a resource');
});

apiRouter.get('/all', async (req, res) => {
  try {
    const roles = await Role.find();

    if (!roles) {
      return res.status(404).send('Roles not found');
    }

    return res.status(200).send(roles);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.get('/:id', async (req, res) => {
  try {
    const item = await Role.findOne({ id: parseInt(req.params.id) });

    if (!item) {
      return res.status(404).send(`${req.params.id} role not found`);
    }

    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.post('/', async (req, res) => {
  try {
    const item = new Role(req.body);

    if (!item) {
      return res.status(400).send('Role not created');
    }

    await item.save();

    return res.status(201).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.put('/:id', async (req, res) => {
  try {
    const item = await Role.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body
    );

    if (!item) {
      return res.status(404).send(`${req.params.id} role not found`);
    }

    const newId = parseInt(req.body.id);
    const prevId = parseInt(req.params.id);

    const id = newId === 0 ? newId : prevId;
    const updatedItem = await Role.findOne({ id });

    if (!updatedItem) {
      return res.status(404).send(`${id} role not found`);
    }

    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRouter.delete('/:id', async (req, res) => {
  try {
    const item = await Role.deleteOne({ id: parseInt(req.params.id) });

    if (!item) {
      return res.status(404).send(`${req.params.id} role not found`);
    }

    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

const rolesRouter = { apiRouter };
export default rolesRouter;
