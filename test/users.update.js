// system libs
const path = require('path');

// third party libs
const chai = require('chai');
const chaiHttp = require('chai-http');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('it-each')({ testPerIteration: true });

// local libraries
const app = require('../src/app');

// configuration
const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = lowdb(adapter);
chai.use(chaiHttp);
const addr = 'http://localhost:3030';

// Test
const update = require('./methods/put.users.test');

const onUpdate = function(data, next){
  db.get('users')
    .find({ uuid: data.uuid })
    .get('old')
    .push(data.old)
    .write();
  db.get('users')
    .find({ uuid: data.uuid })  
    .set('email', data.email)
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
    it.each(db.get('users').value(), 'should %s update email and password', ['email'], update(chai, addr, onUpdate)); 
  });
});
