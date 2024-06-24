import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default commentSchema;
