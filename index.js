const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const app = express();
const port = 3000;

const sequelize = new Sequelize('techstore', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// Importar modelos
const db = require('./models');
const Producto = db.producto;
const Cliente = db.cliente;
const Orden = db.orden;
const Ordenproducto = db.ordenproducto;
const Categoria = db.categoria;

// Asociaciones
Producto.associate(db);
Cliente.associate(db);
Orden.associate(db);
Ordenproducto.associate(db);
Categoria.associate(db);

app.use(bodyParser.json());

const productoRoutes = require('./routes/producto');
const clienteRoutes = require('./routes/cliente');
const ordenRoutes = require('./routes/orden');
const categoriaRoutes = require('./routes/categoria');

app.use('/producto', productoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/orden', ordenRoutes);
app.use('/categoria', categoriaRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en:  http://localhost:${port}`);
  sequelize.sync().then(() => {
    console.log('Database sincronizado');
  }).catch(err => {
    console.error('Unable to synchronize the database:', err);
  });
});