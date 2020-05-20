const fs = require('fs');
const path = require('path');

module.exports = function(chai, server) {
  return function(user, next) {
    chai
      .request(server)
      .post('/authentication')
      .send({
        ...user,
        strategy: 'local'
      })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(201);
        chai.expect(res).to.have.property('body');
        chai.expect(res.body).to.have.property('user');
        chai.expect(res.body).to.have.property('accessToken');

        const p = path.join(__dirname, '..', 'tmp', 'users', `${res.body.user.uuid}.json`);
        const d = fs.readFileSync(p);
        const json = JSON.parse(d);
        json['accessToken'] = res.body.accessToken;
        fs.writeFile(p, JSON.stringify(json), 'utf8', (e) => {
          chai.expect(e).to.be.null;
          next();
        });
      })
  };
}
