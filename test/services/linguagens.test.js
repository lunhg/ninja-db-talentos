const assert = require('assert');
const app = require('../../src/app');

describe('\'linguagens\' service', () => {
  it('registered the service', () => {
    const service = app.service('linguagens');

    assert.ok(service, 'Registered the service');
  });
});
