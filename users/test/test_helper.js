const mongoose = require('mongoose');
//avoiding a depreciation warning by replaceing mongoose default promise with ES6 Promise
mongoose.Promise = global.Promise;

//avoiding "DeprecationWarning: current Server Discovery and Monitoring engine is deprecated"
mongoose.set('useUnifiedTopology', true);

//a hook that runs before all test suit
before(done => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  mongoose.connection
    // .once('open', () => console.log('Good to go!'))
    .once('open', () => {
      done();
    })
    .on('error', error => console.warn('Warning', error));
});

//a hook/function that runs before each test
beforeEach(done => {
  //.drop() deletes a collection
  // mongoose.connection.collections.users.drop(() => {
  //   //ready to do next test by calling done function, done is referenced as a parameter
  //   done();
  // });
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
