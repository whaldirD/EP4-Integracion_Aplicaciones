const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('techstore', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.producto = require('./producto')(sequelize, DataTypes);
db.cliente = require('./cliente')(sequelize, DataTypes);
db.orden = require('./orden')(sequelize, DataTypes);
db.ordenproducto = require('./ordenProducto')(sequelize, DataTypes);
db.categoria = require('./categoria')(sequelize, DataTypes);
db.usuario = require('./usuario')(sequelize, DataTypes);

module.exports = db;