const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = process.env.PORT || 3000; // Usar process.env.PORT para pruebas
const autenController = require('./controller/autenController');

const sequelize = new Sequelize('techstore', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// Importar modelos
const db = require('./models');
const Producto = db.producto;
const Cliente = db.cliente;
const Orden = db.orden;
const Ordenproducto = db.ordenproducto;
const Categoria = db.categoria;
const Usuario = db.usuario;

// Asociaciones
if (Producto.associate) Producto.associate(db);
if (Cliente.associate) Cliente.associate(db);
if (Orden.associate) Orden.associate(db);
if (Ordenproducto.associate) Ordenproducto.associate(db);
if (Categoria.associate) Categoria.associate(db);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const productoRoutes = require('./routes/producto');
const clienteRoutes = require('./routes/cliente');
const ordenRoutes = require('./routes/orden');
const categoriaRoutes = require('./routes/categoria');

app.use('/api/auth', authRoutes);
app.use('/api/producto', autenController.verifyToken, productoRoutes);
app.use('/api/cliente', autenController.verifyToken, clienteRoutes);
app.use('/api/orden', autenController.verifyToken, ordenRoutes);
app.use('/api/categorias', autenController.verifyToken, categoriaRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
    sequelize.sync({ force: false }).then(() => {
      console.log('Database sincronizado');
    }).catch(err => {
      console.error('Unable to synchronize the database:', err);
    });
  });
}

module.exports = app;
