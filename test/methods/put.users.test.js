const faker = require('faker');

module.exports = function(chai, server, callback) {
  return function(user, next) {
    const __new__ = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    chai
      .request(server)
      .put(`/users/${user.uuid}`)
      .set('Authorization', user.accessToken)
      .send(__new__)
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
          uuid: res.body.uuid,
          email: res.body.email,
          password: __new__.password,
          old: {
            email: user.email,
            password: user.password
          }
        }, next);
      });
  };
};
