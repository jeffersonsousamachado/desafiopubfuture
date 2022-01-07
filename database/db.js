const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    password: 'Teste@1234',
    user: 'finance',
    database: 'finance'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Connected on database');
});

module.exports = conn;

