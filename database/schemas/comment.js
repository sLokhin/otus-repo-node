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
    required: true,
  },
});

export default commentSchema;
