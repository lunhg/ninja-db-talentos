// system libs
const path = require('path');

// third party libs
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('it-each')({ testPerIteration: true });

// local libs
const app = require('../src/app');

// configuration
const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = lowdb(adapter);
chai.use(chaiHttp);
const addr = 'http://localhost:3030';

// mock database
db.defaults({
  users: [],
  areas: [],
  habilidades: [],
  linguagens: []
}).write();

// number of users
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

// Test methods
const signup = require('./methods/post.users.test');

// on POST /users
const onSignup = function(data, next){
  db.get('users')
    .find({ email: data.email })
    .set('uuid', data.uuid)
    .write();
  next();
};

const users = db.get('users').value();
const message = 'should %s signup';
const prop = ['email'];

describe('Users signup', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('POST /users', () => {
    it.each(users, message, prop, signup(chai, addr, onSignup));
  });

});
