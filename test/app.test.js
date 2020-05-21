module.exports = function(chai, server) {
  return function(done){
    chai.request(server).get('/').end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.be.html;
      done();
    });
  };
};

