// Initializes the `habilidades` service on path `/habilidades`
const { Habilidades } = require('./habilidades.class');
const createModel = require('../../models/habilidades.model');
const hooks = require('./habilidades.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/habilidades', new Habilidades(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('habilidades');

  service.hooks(hooks);
};
