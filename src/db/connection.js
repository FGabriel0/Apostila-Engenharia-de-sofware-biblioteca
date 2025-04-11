const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:"localhost",
    port: 3003,
    user:"root",
    password:"root",
    database:"sakila"
})

module.exports = connection;