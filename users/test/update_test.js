const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set and save', done => {
    //The benefit of set n save is that we could update only one single property at a time, like updating user’s email or name, then save the changes to the db once. Otherwise we will touch the database twice or more.

    // joe.set('name', 'Alex');
    // joe
    //   .save()
    //   .then(() => User.find({}))
    //   .then(users => {
    //     assert(users.length === 1);
    //     assert(users[0].name === 'Alex');
    //     done();
    //   });

    //refactor the code using helper function
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('a model instance can update', done => {
    // joe
    //   .update({ name: 'Alex' })
    //   .then(() => User.find({}))
    //   .then(users => {
    //     assert(users.length === 1);
    //     assert(users[0].name === 'Alex');
    //     done();
    //   });

    //refactor the code using helper function
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('a model class can update', done => {
    //update all records that match the criteia
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can update one record', done => {
    //update one record
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can find a record with an Id and update', done => {
    //update one record
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });
});
