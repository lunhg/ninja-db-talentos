const assert = require('assert');

module.exports = (app, service) => {
  return function(done){
    assert.ok(app.service(service));
    done();
  };
};
