const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', done => {
    //create an instance using User model/class
    const joe = new User({ name: 'Joe' });

    //save the instance into db using .save()
    joe.save().then(() => {
      //check if the instace is saved successfully using .isNew
      //if isNew === true, the instance isn't saved to the db
      assert(!joe.isNew);
      done();
    });
  });
});
