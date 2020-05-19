// Initializes the `linguagens` service on path `/linguagens`
const { Linguagens } = require('./linguagens.class');
const createModel = require('../../models/linguagens.model');
const hooks = require('./linguagens.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/linguagens', new Linguagens(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('linguagens');

  service.hooks(hooks);
};
