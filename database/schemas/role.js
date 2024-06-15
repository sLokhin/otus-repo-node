import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['student', 'teacher', 'admin'],
  },
  description: {
    type: String,
    required: true,
  },
});

export default roleSchema;
