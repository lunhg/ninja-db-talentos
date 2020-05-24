// third party libs
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('it-each')({ testPerIteration: true });

// local
const app = require('../src/app');

chai.use(chaiHttp);

// requests
chai.use(chaiHttp);
const addr = 'http://localhost:3030';

const services = [
  { name: 'users' },
  { name: 'areas' },
  { name: 'habilidades' },
  { name: 'linguagens' }
];

function test(){
  return function(service, next){
    assert.ok(app.service(service.name));
    next();
  };
}

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
    it('should \'GET /\'', function(done){
      chai.request(addr).get('/').end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.be.html;
        done();
      });
    });
  });

  describe('Application services avaliability', () => {
    it.each(services, 'should %s service be available', ['name'], test());
  });
});
