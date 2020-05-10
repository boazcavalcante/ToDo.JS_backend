const auth = require('../../src/util/auth');

const id = 'abcd1234';
let token = 0;

describe('Auth token', () => {
  it('should generate a new authentication token', async () => {
    token = auth.sign({ id });

    expect(token).toHaveLength(149)
  });

  it('should verify a valid authentication token', async () => {
    const decoded = auth.verify(token);

    expect(decoded).toHaveProperty('id', id)
  })

  it('should verify an invalid authentication token', async () => {
    const invalid = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2QxMjM0IiwiaWF0IjoxNTg3ODMyNzI4LCJleHAiOjE1ODc5MTkxMjh9.abobrinhasJnxMFRuhzOqwVxp9Y5_LHZald2PtRg6dI";
    const decoded = auth.verify(invalid);

    expect(decoded).toBeFalsy()
  })

})
