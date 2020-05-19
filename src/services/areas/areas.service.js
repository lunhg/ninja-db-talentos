// Initializes the `areas` service on path `/areas`
const { Areas } = require('./areas.class');
const createModel = require('../../models/areas.model');
const hooks = require('./areas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/areas', new Areas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('areas');

  service.hooks(hooks);
};
