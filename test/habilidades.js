// system libs
const path = require('path');

// libraries
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
const create = require('./methods/post.habilidades.test');

// configuration
chai.use(chaiHttp);

// Create fake data
const users = db.get('users').value();

// on create area
const onCreate = function(data, next){
  db.get('habilidades').push(data).write();
  db.get('areas')
    .find({ uuid: data.areaUuid })
    .get('habilidades')
    .push(data.uuid)
    .write();
  next();
};

// Tests configuration
const addr = 'http://localhost:3030';

describe('Create habilidades', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', done);
  });
  
  after((done) => {
    this.server.close(done);
  });

  it.each(users, 'should %s create an habilidade from areas', ['email'], create(chai, addr, onCreate));
});
