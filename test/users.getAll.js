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
const getAll = require('./methods/getAll.users.test');

// on GET /users
const onGetAll = function(user, next){
  const promises = [];
  promises.push(new Promise((resolve) => {
    db.get('users')
      .find({ uuid: user.uuid })
      .set('anotherUsers', [])
      .write();
    resolve();
  }));

  users.forEach(function(d){
    if(d.uuid !== user.uuid) {
      promises.push(new Promise((resolve) => {
        db.get('users')
          .find({ uuid: user.uuid })
          .get('anotherUsers')
          .push(d.uuid)
          .write();
        resolve();
      }));
    }
  });
  Promise.all(promises).then(function(){
    next();
  });
};

const users = db.get('users').value();

describe('Users find all and find one', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('GET /users', () => {
    it.each(users, 'should %s get a list of users', ['email'], getAll(chai, addr, onGetAll));
  });

});
