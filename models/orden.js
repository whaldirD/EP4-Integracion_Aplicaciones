const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Orden = sequelize.define('Orden', {
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id',
      },
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'orden',
    timestamps: false, 
  });

  return Orden;
};
