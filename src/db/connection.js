// connection.js ou db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sakita', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados:', error);
    });

module.exports = sequelize;
