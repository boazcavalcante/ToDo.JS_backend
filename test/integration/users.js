const request = require('supertest');
const app = require('../../src/app');
const variables = require('./variables');

let uid = 0;
let token = 0;

const validUser = {
  name: 'joao da silva',
  email: 'joaosilva@example.com',
  password: '12345678'
}

const validLogin = {
  email: 'joaosilva@example.com',
  password: '12345678'
}

const invalidUser = {
  name: 'joao lima',
  email: 'joaosilva@example.com',
}

const invalidLogin1 = {
  email: 'joaobosco@example.com',
  password: '12345678'
}

const invalidLogin2 = {
  email: 'joaosilva@example.com',
  password: '98765432'
}

const differentUser = {
  name: 'joao da santos',
  email: 'joaosantos@example.com',
  password: '87654321'
}

describe('Users routes', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/users/register').send(validUser);

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('message', "User created")
  })

  it('should not create an existing user', async () => {
    const response = await request(app).post('/users/register').send(validUser);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error', "Invalid or existing user")
  })

  it('should not create an invalid user', async () => {
    const response = await request(app).post('/users/register').send(invalidUser);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error')
  })

  it('should signin a user', async () => {
    const response = await request(app).post('/users/authenticate').send(validLogin);

    token = response.body.token;
    variables.token = token;

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
    expect(response.body.user).toHaveProperty('email', validUser.email)
    expect(response.body.token).toHaveLength(149)
  })

  it('should not signin with invalid email', async () => {
    const response = await request(app).post('/users/authenticate').send(invalidLogin1);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error', "User not found")
  })

  it('should not signin with wrong password', async () => {
    const response = await request(app).post('/users/authenticate').send(invalidLogin2);

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error', "Invalid password")
  })

  it('should not update with invalid token', async () => {
    const response = await request(app).put('/users/')
      .set('Authorization', `Beare`).send();

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'Token error')
  })

  it('should not update with invalid token', async () => {
    const response = await request(app).put('/users/')
      .set('Authorization', `Bearer 1234`).send();

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('error', 'Invalid token')
  })

  it('should not update with invalid information', async () => {
    const response = await request(app).put('/users/')
      .set('Authorization', `Bearer ${token}`).send();

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('error', 'Invalid information provided')
  })

  it('should update with valid information', async () => {
    const response = await request(app).put('/users/')
      .set('Authorization', `Bearer ${token}`).send(differentUser);

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message', 'User updated')
  })

  it('should delete user', async () => {
    const response = await request(app).delete('/users')
      .set('Authorization', `Bearer ${token}`).send();

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message', 'User deleted')
  })
});