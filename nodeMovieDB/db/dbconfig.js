const { text } = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'moviedb',
    password: 'salendb'

});


module.exports = {
    query: (text, params) => pool.query(text, params),
}
