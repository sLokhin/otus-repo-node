import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    validate: (val) => {
      return new Promise((resolve) => {
        mongoose
          .model('roles')
          .findOne({ name: val })
          .then((res) => {
            resolve(res ? true : false);
          });
      });
    },
  },
  courses: {
    type: [String],
    required: true,
    unique: true,
  },
});

export default userSchema;
