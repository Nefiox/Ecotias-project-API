module.exports = (sequelize, dataTypes) => {
    let alias = "Producto_carrito";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        carrito_id: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        producto_id: {
            type: dataTypes.INTEGER(10),
            allowNull: true
        }
    };

    let config = {
        tableName: "producto_carrito",
        timestamps: false
    }

    let Producto_carrito = sequelize.define(alias, cols, config);
    
    return Producto_carrito;
}