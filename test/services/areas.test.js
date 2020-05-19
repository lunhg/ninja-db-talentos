const assert = require('assert');
const app = require('../../src/app');

describe('\'areas\' service', () => {
  it('registered the service', () => {
    const service = app.service('areas');

    assert.ok(service, 'Registered the service');
  });
});
