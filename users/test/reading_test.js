const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('finds all users with a name of Joe', done => {
    // .find method will query all records that matches the criteria
    User.find({ name: 'Joe' }).then(users => {
      // _id isn't a pure string, it is ObjectId('dffdfnieos83nfiduwi3'), using toString() in comparison
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('find a user with a particular id', done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
