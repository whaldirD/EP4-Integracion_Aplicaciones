module.exports = (sequelize, DataTypes) => {
    const producto = sequelize.define('producto', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: DataTypes.TEXT,
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoriaId: DataTypes.INTEGER
    }, {})
    producto.associate = function(models) {
        producto.hasMany(models.categoria, {foreignKey: 'categoriaId'})
    }
    return producto
}