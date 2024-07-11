module.exports = (sequelize, DataTypes) => {
    const ordenproducto = sequelize.define('ordenproducto', {
        ordenId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productoId:  {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {})
    ordenproducto.associate = function(models) {

    }
    return ordenproducto
}