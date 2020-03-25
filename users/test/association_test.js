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
      .populate('blogPosts') //it is the property blogPosts not the collection blogPost, populate enhances the query and fetch the associated collection
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great.');
        done();
      });
  });

  //caution: the number of the associations to load up, the more the number of the associations to load up, the easier to bog down the duration of the query
  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great.');
        assert(user.blogPosts[0].comments[0].content === 'Agree on that');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
