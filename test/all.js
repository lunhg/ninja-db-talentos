// libraries
require('it-each')({ testPerIteration: true });
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

// local libraries
const app = require('../src/app');

// configuration
chai.use(chaiHttp);

// Tests options
const TEST = {
  app: require('./app.test'),
  api: require('./api.test'),
  users: {
    members: [],
    post: require('./methods/post.users.test')
  }
}

// Tests configuration
const addr = 'http://localhost:3030';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV === 'development') TEST.users.number = 2;  
if (process.env.NODE_ENV === 'test') TEST.users.number = 20;
if (process.env.NODE_ENV === 'production') TEST.users.number = 100;

for(let i=0; i < TEST.users.number; i++){
  TEST.users.members[i] = {};
  TEST.users.members[i].email = faker.internet.email();
  TEST.users.members[i].password = faker.internet.password();
}

// Running tests
describe('Application tests', () => {

  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(done);
  });

  describe('Application root page', () => { 
    it('should \'GET /\'', TEST.app(chai, addr));
  });

  describe('Application services avaliability', () => {
    it('should users service to be available', TEST.api(app, 'users'));
    it('should authtentication service to be available', TEST.api(app, 'authentication'));
    it('should areas to be available', TEST.api(app, 'areas'));
    it('should habilidades to be available', TEST.api(app, 'habilidades'));
    it('should linguagens to be available', TEST.api(app, 'linguagens'));
  });

  describe('Application signup, verification and login', () => {
    it.each(TEST.users.members, 'should create user and send token verification', TEST.users.post(chai, addr));
  });
});
