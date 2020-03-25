const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('association', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great.',
      content: 'Yeah, JS is good.',
    });
    comment = new Comment({ content: 'Agree on that' });

    joe.blogPosts.push(blogPost); // wire up hasMany relation, mongoose will add the ObjectId of blogPost into joe.blogPosts
    blogPost.comments.push(comment); //wire up hasMany relation
    comment.user = joe; //wire up hasOne relation

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  //adding .only will execute this test suit only
  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') //enhance the query and fetch the associated blogPost collection
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great.');
        done();
      });
  });
});
