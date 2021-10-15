module.exports = (sequelize, dataTypes) => {
    let alias = "Category";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(60),
            allowNull: true
        }
    };

    let config = {
        tableName: "category",
        timestamps: false
    }
    
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'id'
        });
    }
    return Category;
}