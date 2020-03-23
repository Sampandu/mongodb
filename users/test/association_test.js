const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('association', () => {
  let joe, blogPost, comment;
  beforeEach(() => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great.',
      content: 'Yeah, JS is good.',
    });
    comment = new Comment({ content: 'Agree on that' });

    joe.blogPosts.push(blogPost); // wire up hasMany relation, mongoose will add the ObjectId of blogPost into joe.blogPosts
    blogPost.push(comment); //wire up hasMany relation
    comment.user = joe; //wire up hasOne relation
  });
});
