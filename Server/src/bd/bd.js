const mysql = require('mysql');

const pool = mysql.createPool({
    "host": "localhost",
    "user": "root",
    "password": "jotinha",
    "database": "plux",
    //"port": process.env.MYSQL_PORT,

})

exports.pool = pool;