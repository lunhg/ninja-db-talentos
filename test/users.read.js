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
const getAll = require('./methods/getAll.users.test');
const getOne = require('./methods/get.users.test');

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

// on GET /users
const onGetAll = function(data, next){
  data.forEach(function(d){
    db.get('users')
      .find({ uuid: d.uuid })
      .set('anotherUsers', [])
      .write();
  });
  db.get('users').value().forEach(function(u){
    data.forEach(function(d){
      if (u.uuid !== d.uuid){
        db.get('users')
          .find({ uuid: d.uuid })
          .get('anotherUsers')
          .push(u.uuid)
          .write();
      }
    });
  });
  next();
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

  describe('GET /users/:uuid', () => {
    it.each(users, 'should %s get another users by uuid', ['email'], getOne(chai, addr));
  });

});
