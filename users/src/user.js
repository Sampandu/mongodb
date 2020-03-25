const mongoose = require('mongoose');
const postSchema = require('./postSchema');
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
  // postCount: Number,  //replaced with virtual parameter
  posts: [postSchema], //nesting a schema into another schema, created a subdocument
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost',
    },
  ],
});

UserSchema.virtual('postCount').get(function() {
  //set postCount as virtual type
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
