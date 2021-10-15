module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id:{
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        num_items: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        precio_total: {
            type: dataTypes.DOUBLE,
            allowNull: true
        }
    };

    let config = {
        tableName: "carrito",
        timestamps: false
    }
    
    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(models) {
        Carrito.hasMany(models.Producto_carrito, {
            as: 'producto_carrito',
            foreignKey: 'carrito_id'
        })
    }
    return Carrito;
}