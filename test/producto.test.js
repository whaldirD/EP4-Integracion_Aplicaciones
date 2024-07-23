const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta es correcta

describe('Producto Endpoints', () => {
  let token;

  beforeAll(async () => {
    // Registrar y autenticar un usuario para obtener un token
    await request(app)
      .post('/api/auth/registrar')
      .send({
        nombre: 'testuser',
        correo: 'testuser@example.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        correo: 'mati@gmail.com',
        password: '123'
      });
    expect(res.statusCode).toEqual(200);
    token = res.body.token; // Asumiendo que el token está en res.body.token
  });

  it('puedes crear un nuevo producto', async () => {
    const res = await request(app)
      .post('/api/producto')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre: 'producto1',
        descripcion: 'descripcion de producto1',
        precio: 100
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/producto')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
