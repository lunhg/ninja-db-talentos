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

/*
  TEST configuration
 */

// requests
chai.use(chaiHttp);
const addr = 'http://localhost:3030';

// number of users
let NUMBER_USERS = 0;

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if(process.env.NODE_ENV === 'development') NUMBER_USERS = 2 ** 2;
if(process.env.NODE_ENV === 'test') NUMBER_USERS = 2 ** 3;
if(process.env.NODE_ENV === 'deploy') NUMBER_USERS = 2 ** 4;
if(process.env.NODE_ENV === 'staging') NUMBER_USERS = 2 ** 5;
if(process.env.NODE_ENV === 'production') NUMBER_USERS = 2 ** 6;

/*
  Callback tests
*/

// on POST /authentication
const onSignin = function(data, next){
  db.get('users')
    .find({ uuid: data.user.uuid })
    .set('accessToken', data.accessToken)
    .write();
  next();
};

const users = db.get('users').value();

describe('Users login', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('POST /authentication', () => {
    it.each(users, 'should %s signin', ['email'], signin(chai, addr, onSignin));
  });
});
