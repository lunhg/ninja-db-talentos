function notAuth(chai, server, credential){
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .post('/authentication')
      .send({
        ...credential,
        strategy: 'local'
      })
      .end((err, res) => {
        if (err) reject(err);
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.have.property('name');
        chai.expect(res.body).to.have.property('code');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body).to.have.property('className');
        chai.expect(res.body.name).to.equal('NotAuthenticated');
        chai.expect(res.body.message).to.equal('Invalid login');
        chai.expect(res.body.className).to.equal('not-authenticated');
        resolve();
      }); 
  });
}

module.exports = function(chai, server) {
  return function(user, next) {
    const promises = user.old.map(function(credential){
      return notAuth(chai, server, credential);
    });
    Promise.all(promises).then(function(res){
      next();
    });
  };
};
