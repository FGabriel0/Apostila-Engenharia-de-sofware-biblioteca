module.exports = (sequelize, DataTypes) => {
    const Editora = sequelize.define('Editoras', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gerente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco:{
            type: DataTypes.STRING,
            allowNull: false
        },
        celular: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telefone: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false // 👈 aqui desativa as colunas automáticas
    });

    return Editora;
};
