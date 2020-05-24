const faker = require('faker');

module.exports = function(chai, server, callback) {
  return function(user, next) {
    chai
      .request(server)
      .patch(`/users/${user.uuid}`)
      .set('Authorization', user.accessToken)
      .send({
        email: faker.internet.email()
      })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('uuid');
        chai.expect(res.body).to.have.property('email');
        chai.expect(res.body).to.not.have.property('password');
        chai.expect(res.body).to.have.property('createdAt');
        chai.expect(res.body).to.have.property('updatedAt');
        callback({
          ...res.body,
          old: {
            email: user.email,
            password: user.password
          }
        }, next);
      });
  };
};
