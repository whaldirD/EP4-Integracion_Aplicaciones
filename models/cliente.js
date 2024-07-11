module.exports = (sequelize, DataTypes) => {
    const cliente = sequelize.define('cliente', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:  {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        telefono: DataTypes.STRING,
        direccion: DataTypes.TEXT
    }, {})
    cliente.associate = function(models) {

    }
    return cliente
}