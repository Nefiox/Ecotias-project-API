module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(30),
            allowNull: true
        },
        last_name:{
            type: dataTypes.STRING(30),
            allowNull: true
        },
        email:{
            type: dataTypes.STRING(40),
            allowNull: true
        },
        password:{
            type: dataTypes.STRING(200),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(200),
            allowNull: true
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: false
    }
    
    const Usuario = sequelize.define(alias, cols, config);

    // Usuario.associate = function(models) {
    //     Usuario.belongsTo(models.Carrito, {
    //         as: 'carrito',
    //         foreignKey: 'usuario_id'
    //     })
    // }
    return Usuario;
}