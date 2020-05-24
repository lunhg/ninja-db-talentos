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

// Test methods
const notAuthenticate = require('./methods/post.not.authentication.test');

const users = db.get('users').value();
const message = 'should fail %s signin';
const prop = ['email'];

describe('Users not login', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('POST fail /authentication', () => {
    it.each(users, message, prop, notAuthenticate(chai, addr));
  });
});
