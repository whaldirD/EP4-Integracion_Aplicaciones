module.exports = (sequelize, DataTypes) => {
    const orden = sequelize.define('orden', {
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        estado:  {
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {})
    orden.associate = function(models) {
        orden.belongsTo(models.cliente, {foreignkey: 'clienteId'});
        orden.belongsToMany(models.producto, {through: 'ordenproducto', foreignKey: 'ordenId'});
    }
    return orden
}