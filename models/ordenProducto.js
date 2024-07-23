const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrdenProducto = sequelize.define('OrdenProducto', {
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orden',
        key: 'id',
      },
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'ordenproducto',
    timestamps: false, 
  });

  return OrdenProducto;
};