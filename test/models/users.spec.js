const usersModel = require('../../src/models/users');

let uid = 0;

const validUser = {
  name: 'joao da silva',
  email: 'joaosilva@example.com',
  password: '12345678'
}

const invalidUser = {
  name: 'joao lima',
  email: 'joaosilva@example.com',
}

const differentUser = {
  name: 'joao da santos',
  email: 'joaosantos@example.com',
  password: '87654321'
}

describe('Test operations in user table', () => {

  it('should not create an invalid user', async () => {
    const created = await usersModel.create(invalidUser);

    expect(created).toBeFalsy()
  })

  it('should create a valid user', async () => {
    const created = await usersModel.create(validUser);
    const usersList = await usersModel.list();

    uid = usersList[0].id;

    expect(created).toBeTruthy()
    expect(usersList).toContainEqual(validUser)
  })

  it('should not create an existing user', async () => {
    const created = await usersModel.create(validUser);

    expect(created).toBeFalsy()
  })

  it('should update valid user', async () => {
    const updated = await usersModel.update(uid, differentUser);
    const modified = await usersModel.getOne({ id: uid });

    expect(updated).toBeTruthy()
    expect(modified).toMatchObject(differentUser)
  })

  it('should delete an existing user', async () => {
    const deleted = await usersModel.delete(uid);

    expect(deleted).toBeTruthy()
  })
});