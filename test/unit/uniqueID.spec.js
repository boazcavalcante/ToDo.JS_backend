const uniqueId = require('../../src/util/uniqueId');

const id1 = 0;
const id2 = 0;

describe('Unique id function', () => {
  it('should generate a unique id', () => {
    const id1 = uniqueId();

    expect(id1).toHaveLength(8)
  })
  it('should generate another unique id', () => {
    const id2 = uniqueId();

    expect(id2).toHaveLength(8)
    expect(id2 == id1).toBeFalsy()
  })
});