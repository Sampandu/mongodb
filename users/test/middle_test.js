const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great.',
      content: 'Yeah, JS is good.',
    });

    joe.blogPosts.push(blogPost); // wire up hasMany relation, mongoose will add the ObjectId of blogPost into joe.blogPosts

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  // it('users clean up dangling blogposts on remove', done => {
  //   joe
  //     .remove()
  //     .then(() => BlogPost.count())
  //     .then(count => {
  //       assert(count === 0);
  //       done();
  //     });
  // });
});
