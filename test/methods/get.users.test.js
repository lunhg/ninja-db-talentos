function getAnotherUser(chai, server, user, anotherUserUuid){
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .get(`/users/${anotherUserUuid}`)
      .set('Authorization', user.accessToken)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('email');
        chai.expect(res.body).to.have.property('uuid');
        chai.expect(res.body).to.have.property('createdAt');
        chai.expect(res.body).to.have.property('updatedAt');
        chai.expect(res.body).to.not.have.property('password');
        resolve(res.body);
      });
  });
}

module.exports = function(chai, server) {
  return function(user, next) {
    const promises = user.anotherUsers.map(function(uuid){
      return getAnotherUser(chai, server, user, uuid);
    });
    Promise.all(promises).then(function(res){
      next();
    });
  };
};
