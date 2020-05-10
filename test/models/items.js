const itemsModel = require('../../src/models/items');

let id = 0;

const validItem = {
  title: 'homework',
  done: '0',
  user_id: '1234abcd'
}

const invalidItem = {
  title: 'homework',
  user_id: '1234abcd'
}

const differentItem = {
  title: 'math test',
}

const doneItem = {
  done: '1'
}

describe('Test operations in items table', () => {

  it('should not create an invalid item', async () => {
    const created = await itemsModel.create(invalidItem);

    expect(created).toBeFalsy()
  })

  it('should create a valid item', async () => {
    const created = await itemsModel.create(validItem);
    const itemsList = await itemsModel.list();

    id = itemsList[0].id;

    expect(created).toBeTruthy()
    expect(itemsList[0]).toMatchObject(validItem)
  })

  it('should not create an existing item', async () => {
    const created = await itemsModel.create(validItem);

    expect(created).toBeFalsy()
  })

  it('should update valid item', async () => {
    const updated = await itemsModel.update(id, differentItem);
    const modified = await itemsModel.getOne({ id });

    expect(updated).toBeTruthy()
    expect(modified).toMatchObject(differentItem)
  })

  it('should done valid item', async () => {
    const updated = await itemsModel.update(id, doneItem);
    const modified = await itemsModel.getOne({ id });

    expect(updated).toBeTruthy()
    expect(modified.done).toBe('1')
  })

  it('should get user items', async () => {
    const itemsList = await itemsModel.getAll({ user_id: '1234abcd' });

    expect(itemsList[0]).toMatchObject(differentItem)
  })

  it('should delete an existing item', async () => {
    const deleted = await itemsModel.delete(id);

    expect(deleted).toBeTruthy()
  })
});