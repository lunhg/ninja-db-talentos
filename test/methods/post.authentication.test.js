const fs = require('fs');
const path = require('path');

module.exports = function(chai, server, callback) {
  return function(user, next) {
    chai
      .request(server)
      .post('/authentication')
      .send({
        ...user,
        strategy: 'local'
      })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(201);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('user');
        chai.expect(res.body).to.have.property('accessToken');
        callback(Object.assign(user, res.body), next);
      });
  };
}
