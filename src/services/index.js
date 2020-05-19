const users = require('./users/users.service.js');
const habilidades = require('./habilidades/habilidades.service.js');
const areas = require('./areas/areas.service.js');
const linguagens = require('./linguagens/linguagens.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(habilidades);
  app.configure(areas);
  app.configure(linguagens);
};
