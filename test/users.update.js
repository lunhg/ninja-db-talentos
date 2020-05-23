// system libs
const path = require('path');

// third party libs
require('it-each')({ testPerIteration: true });
const chai = require('chai');
const chaiHttp = require('chai-http');

// lowdb is used to mock data of mysql
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'test.db.json'));
const db = lowdb(adapter);

// local libraries
const app = require('../src/app');
const update = require('./methods/put.users.test');
const patchPassword = require('./methods/patch.password.users.test');

/*
  TEST configuration
 */

// requests
chai.use(chaiHttp);
const addr = 'http://localhost:3030';

/*
  Callback tests
*/

// on PUT /users/:uuid
const onUpdate = function(data, next){
  db.get('users')
    .find({ uuid: data.uuid })
    .set('old', {
      email: db.get('users').find({ uuid: data.uuid }).get('email').value(),
      password: db.get('users').find({ uuid: data.uuid }).get('password').value()
    })
    .set('email', data.email)
    .set('password', data.password)
    .write();
  
  next();
};

// on PATCH password /users/:uuid
const onPatchPassword = function(data, next){
  db.get('users')
    .find({ uuid: data.uuid })
    .set('old', {
      password: db.get('users').find({ uuid: data.uuid }).get('password').value()
    })
    .set('password', data.password)
    .write();
  
  next();
};

describe('Users updates', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('PUT /users/:uuid', () => {
    it.each(db.get('users').value(), 'should %s update itself', ['email'], update(chai, addr, onUpdate));
  });

  describe('PATCH /users/:uuid', () => {
    it.each(db.get('users').value(), 'should %s patch own password', ['email'], patchPassword(chai, addr, onPatchPassword));
  });
});
