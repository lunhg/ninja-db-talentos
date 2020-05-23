module.exports = function(chai, server, callback) {
  return function(user, next) {
    chai
      .request(server)
      .get('/users')
      .set('Authorization', user.accessToken)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('total');
        chai.expect(res.body).to.have.property('limit');
        chai.expect(res.body).to.have.property('skip');
        chai.expect(res.body).to.have.property('data');
        chai.expect(res.body.total).to.be.greaterThan(0);
        chai.expect(res.body.data.length).to.be.greaterThan(0);
        chai.expect(res.body.data.length).to.be.at.most(res.body.limit);
        callback(res.body.data, next);
      });
  };
};
