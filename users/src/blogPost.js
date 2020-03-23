const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId, //ObjectId is the _id of the collection whi
      ref: 'comment', //refer to the collection 'comment' which is the name of the collection in mongoDB, not the name of model in server side
    },
  ],
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
