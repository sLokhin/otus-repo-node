import mongoose from 'mongoose';
import commentSchema from './comment.js';

const courseSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  teachers: {
    type: [String],
    required: true,
  },
  admins: {
    type: [String],
    required: true,
  },
  comments: {
    type: [commentSchema],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  lessons: {
    type: [String],
    required: true,
  },
});

export default courseSchema;
