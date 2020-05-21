module.exports = function(chai, server, callback) {
  return function(user, next) {
    chai
      .request(server)
      .post('/users')
      .send(user)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(201);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('uuid');
        chai.expect(res.body).to.have.property('email');
        chai.expect(res.body).to.have.property('createdAt');
        chai.expect(res.body).to.have.property('updatedAt');
        callback(Object.assign(user, res.body), next);
      });
  };
};
