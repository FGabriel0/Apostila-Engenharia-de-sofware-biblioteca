module.exports = (sequelize, DataTypes) => {
    const Livro = sequelize.define('Livro', {
        codigo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editora: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // 👈 aqui desativa as colunas automáticas
    });

    return Livro;
};
