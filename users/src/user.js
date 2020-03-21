const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2, //validation function
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name is required.'], //validation
  },
  postCount: Number,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
