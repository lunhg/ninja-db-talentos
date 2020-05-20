const fs = require('fs');
const path = require('path');

module.exports = function(chai, server) {
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
        const p = path.join(__dirname, '..', 'tmp', 'users', `${res.body.uuid}.json`);
        fs.writeFile(p, JSON.stringify(user), 'utf8', (e) => {
          chai.expect(e).to.be.null;
          next();
        });
      })
  };
}
