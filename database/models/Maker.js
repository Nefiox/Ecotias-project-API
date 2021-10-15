module.exports = (sequelize, dataTypes) => {
    let alias = "Maker";

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
        tableName: "maker",
        timestamps: false
    }
    
    const Maker= sequelize.define(alias, cols, config);

    Maker.associate = function(models) {
        Maker.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'maker_id'
        })
    }
    return Maker;
}