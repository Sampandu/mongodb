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

//set postCount as virtual type
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

//set up mongoose middle to clean up a user and its related blogPosts
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model(' blogPost');
  //$in is a mongo operator
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

//testing
