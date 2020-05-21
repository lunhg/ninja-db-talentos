const chai = require('chai');
const chaiHttp = require('chai-http');

// local libraries
const app = require('../src/app');

// configuration
chai.use(chaiHttp);

// Tests options
const TEST = {
  app: require('./app.test'),
  api: require('./api.test')
}

// Tests configuration
const addr = 'http://localhost:3030';

// Running tests
describe('Check Health tests', () => {
  
  before((done) => {
    this.server = app.listen(app.get('port'));
    this.server.once('listening', () => {
      done();
    });
  });

  after((done) => {
    this.server.close(function(){
      done();
    });
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
});
