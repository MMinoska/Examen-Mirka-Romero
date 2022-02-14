const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'token'
});

mysqlConnection.connect(function (err){
    if (err){
        console.log(err);
        return;
    } else{
        console.log('Conectado al Database')
    }
});

module.exports = mysqlConnection;

