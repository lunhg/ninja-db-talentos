const assert = require('assert');
const app = require('../../src/app');

describe('\'habilidades\' service', () => {
  it('registered the service', () => {
    const service = app.service('habilidades');

    assert.ok(service, 'Registered the service');
  });
});
