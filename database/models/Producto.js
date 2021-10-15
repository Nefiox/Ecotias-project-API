module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(60),
            allowNull: true
        },
        description:{
            type: dataTypes.STRING(200),
            allowNull: true
        },
        category_id:{
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        price:{
            type: dataTypes.DOUBLE,
            allowNull: true
        },
        maker_id:{
            type: dataTypes.INTEGER(10),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(200),
            allowNull: true
        }
    };

    let config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        // Producto.belongsToMany(models.Producto_carrito, {
        //     as: 'producto',
        //     through: "Producto_carrito",
        //     foreignKey: 'producto_id',
        //     otherKey: 'carrito_id'
        // })
        Producto.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
            // constraints: false 
        });

        Producto.belongsTo(models.Maker, {
            as: 'maker',
            foreignKey: 'maker_id'
            // constraints: false 
        });

    }
    return Producto;
}