// system libs
const fs = require('fs');
const path = require('path');

// third party libs
require('it-each')({ testPerIteration: true });
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

// local libraries
const app = require('../src/app');
const signup = require('./methods/post.users.test');
const signin = require('./methods/post.authentication.test');

// configuration
chai.use(chaiHttp);
const USERS = [];
for(let i=0; i < 2; i++){
  USERS[i] = {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}


// Tests configuration
const addr = 'http://localhost:3030';

// on signup
const onSignup = function(data, next){
  const p = path.join(__dirname, 'tmp', 'users', `${data.uuid}.json`);
  fs.writeFile(p, JSON.stringify(data), 'utf8', (e) => {
    chai.expect(e).to.be.null;
    next();
  });
};

// on signin
const onSignin = function(data, next){
  const p = path.join(__dirname, 'tmp', 'users', `${data.uuid}.json`);
  fs.writeFile(p, JSON.stringify(data), 'utf8', (e) => {
    chai.expect(e).to.be.null;
    next();
  });
};

describe('Application signup and login', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  it.each(USERS, 'should %s signup', ['email'], signup(chai, addr, onSignup));
  it.each(USERS, 'should %s signin', ['email'], signin(chai, addr, onSignin));
});
