const pw = require('../../src/util/password');

const password = "123456";
const invalid = "654321";
let hashed = 0;

describe('Hash password', () => {
  it('should hash a password', async () => {
    hashed = await pw.hash(password);

    expect(hashed).toHaveLength(60)
  });

  it('should compare a valid password to its hash', async () => {
    const compare = await pw.compare(password, hashed)

    expect(compare).toBeTruthy()
  });

  it('should compare an invalid password to some hash', async () => {
    const compare = await pw.compare(invalid, hashed)

    expect(compare).toBeFalsy()
  });
})
