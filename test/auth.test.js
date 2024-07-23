const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta es correcta

describe('Auth Endpoints', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/registrar')
      .send({
        nombre: 'testuser',
        correo: 'testuser@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(201);
    token = res.body.token;
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        correo: 'mati@gmail.com',
        password: '123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token'); 
  });
});
