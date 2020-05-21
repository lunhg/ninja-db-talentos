const faker = require('faker');

module.exports = function(chai, server, callback) {
  return function(user, next) {
    chai
      .request(server)
      .post('/areas')
      .set('Authorization', user.accessToken)
      .send({
        userUuid: user.uuid,
        title: faker.lorem.word(),
        description: faker.lorem.paragraph()
      })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(201);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('uuid');
        chai.expect(res.body).to.have.property('title');
        chai.expect(res.body).to.have.property('description');
        chai.expect(res.body).to.have.property('createdAt');
        chai.expect(res.body).to.have.property('updatedAt');
        callback(res.body, next);
      });
  };
};
