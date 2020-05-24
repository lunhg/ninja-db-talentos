const faker = require('faker');

module.exports = function(chai, server, callback) {
  return function(user, next) {
    chai
      .request(server)
      .delete(`/users/${user.uuid}`)
      .set('Authorization', user.accessToken)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        callback(user, next);
      });
  };
};
