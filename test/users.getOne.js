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

const getOne = require('./methods/get.users.test');

const users = db.get('users').value();

describe('Users find one', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('GET /users/:uuid', () => {
    it.each(users, 'should %s get another users by uuid', ['email'], getOne(chai, addr));
  });

});
