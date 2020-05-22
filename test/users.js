// system libs
const path = require('path');

// third party libs
require('it-each')({ testPerIteration: true });
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

// lowdb is used to mock data of mysql
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'test.db.json'));
const db = lowdb(adapter);

// local libraries
const app = require('../src/app');
const signup = require('./methods/post.users.test');
const signin = require('./methods/post.authentication.test');

// configuration
chai.use(chaiHttp);

db.defaults({
  users: [],
  areas: [],
  habilidades: [],
  linguagens: []
}).write();

let NUMBER_USERS = 0;

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if(process.env.NODE_ENV === 'development') NUMBER_USERS = 2 ** 2;
if(process.env.NODE_ENV === 'test') NUMBER_USERS = 2 ** 3;
if(process.env.NODE_ENV === 'deploy') NUMBER_USERS = 2 ** 4;
if(process.env.NODE_ENV === 'staging') NUMBER_USERS = 2 ** 5;
if(process.env.NODE_ENV === 'production') NUMBER_USERS = 2 ** 6;

for(let i=0; i < NUMBER_USERS; i++){
  db.get('users')
    .push({
      email: faker.internet.email(),
      password: faker.internet.password(),
      areas: []
    })
    .write();
}


// Tests configuration
const addr = 'http://localhost:3030';

// on signup
const onSignup = function(data, next){
  db.get('users')
    .find({ email: data.email })
    .set('uuid', data.uuid)
    .write();
  next();
};

// on signin
const onSignin = function(data, next){
  db.get('users')
    .find({ uuid: data.user.uuid })
    .set('accessToken', data.accessToken)
    .write();
  next();
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

  it.each(db.get('users').value(),'should %s signup', ['email'], signup(chai, addr, onSignup));

  it.each(db.get('users').value(), 'should %s signin', ['email'], signin(chai, addr, onSignin));
});
