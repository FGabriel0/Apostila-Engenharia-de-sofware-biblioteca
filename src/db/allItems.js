const connection = require('./connection')

const allItems = async () => {
    const{query} = await connection.execute('SELECT * FROM sakita.actor');
    return query;
}

module.exports = allItems;