// system libs
const fs = require('fs');
const path = require('path');

// libraries
require('it-each')({ testPerIteration: true });
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

// local libraries
const app = require('../src/app');
const create = require('./methods/post.areas.test');
const update = require('./methods/update.areas.test');

// configuration
chai.use(chaiHttp);

// Tests options
function buildUsers(){
  const users = [];
  const p = path.join(__dirname, 'tmp', 'users');
  const dir = fs.readdirSync(p);
  const regex = new RegExp('.+.json');
  const list = dir.map(function(f){
    if (f.match(regex)){
      return f;
    }
  });
  for(let i in list){
    users[i] = JSON.parse(fs.readFileSync(path.join(p, list[i]), 'utf8'));
  }
  return users;
};

// on create area
const onCreate = function(data, next){
  const p = path.join(__dirname, 'tmp', 'areas', `${data.uuid}.json`);
  fs.writeFile(p, JSON.stringify(data), 'utf8', (e) => {
    chai.expect(e).to.be.null;
    next();
  });
}

// Tests configuration
const addr = 'http://localhost:3030';
const USERS = buildUsers();

describe('Create areas', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', done);
  });
  
  after((done) => {
    this.server.close(done);
  });

  it.each(USERS, 'should %s create an area', ['email'], create(chai, addr, onCreate));
})
