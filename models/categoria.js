module.exports = (sequelize, DataTypes) => {
    const categoria = sequelize.define('categoria', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: DataTypes.TEXT
    }, {})
    categoria.associate = function(models) {
        categoria.hasMany(models.producto, {foreignKey: 'categoriaId'})
    }
    return categoria
}