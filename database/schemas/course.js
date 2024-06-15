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
  comments: {
    type: [commentSchema],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  media: {
    type: [String],
    required: false,
  },
});

export default courseSchema;
