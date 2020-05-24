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
const del = require('./methods/delete.users.test');

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
const onDelete = function(data, next){
  db.get('users')
    .find({ uuid: data.uuid })
    .set(null)
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

  describe('DELETE /users/:uuid', () => {
    it.each(db.get('users').value(), 'should %s delete itself', ['email'], del(chai, addr, onDelete));
  });
});
