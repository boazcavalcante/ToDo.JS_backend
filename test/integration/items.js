const request = require('supertest');
const app = require('../../src/app');
const variables = require('./variables');

let id = 0;
let token = 0;

const validItem = {
  title: 'dever de casa',
  done: '0',
}

const invalidItem = {
  title: 'homework',
  user_id: '1234abcd'
}

const differentItem = {
  id: '2',
  title: 'math test',
}

const invalidDifferentItem = {
  id: '2',
}


const doneItem = {
  done: '1'
}

describe('Items routes', () => {

  it('should create a new item', async () => {
    const response = await request(app).post('/items')
      .set('Authorization', `Bearer ${variables.token}`).send(validItem);

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('message', "Item created")
  })

  it('should not create an existing item', async () => {
    const response = await request(app).post('/items')
      .set('Authorization', `Bearer ${variables.token}`).send(validItem);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error', "Invalid or existing item")
  })

  it('should not create an invalid item', async () => {
    const response = await request(app).post('/items')
      .set('Authorization', `Bearer ${variables.token}`).send(invalidItem);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  })

  it('shoud list items', async () => {
    const response = await request(app).get('/items')
      .set('Authorization', `Bearer ${variables.token}`);

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('items')
  })

  it('should not update with invalid token', async () => {
    const response = await request(app).put('/items/')
      .set('Authorization', `Beare`).send(differentItem);

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'Token error')
  })

  it('should not update with invalid token', async () => {
    const response = await request(app).put('/items/')
      .set('Authorization', `Bearer 1234`).send(differentItem);

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'Invalid token')
  })

  it('should not update with invalid information', async () => {
    const response = await request(app).put('/items/')
      .set('Authorization', `Bearer ${variables.token}`).send(invalidDifferentItem);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error', 'Invalid information provided')
  })

  it('should update with valid information', async () => {
    const response = await request(app).put('/items/')
      .set('Authorization', `Bearer ${variables.token}`).send(differentItem);

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message', 'Item updated')
  })

  it('should delete item', async () => {
    const response = await request(app).delete('/items')
      .set('Authorization', `Bearer ${variables.token}`).send({ id: '2' });

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message', 'Item deleted')
  })
});