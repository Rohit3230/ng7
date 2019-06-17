var mysql = require('mysql');
var db = 'stockAccount';
// dbPool = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : db,
//     connectionLimit: 10000,
//     connectTimeout: 10000,
//     supportBigNumbers: true,
//     acquireTimeout: 100000,
//     debug: false
// });

var dbPool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root'
});

dbPool.query('CREATE DATABASE IF NOT EXISTS ??', db, function(err, results) {
    if (err) {
      console.log('error in creating database', err);
      return;
    }
  
    console.log('created a new database');
    dbPool.query("INSERT INTO `artist`(`name`) VALUES ('Annu Patel')", function(err, result) {
        if (err) {
          console.log('error in creating tables', err);
          return;
        }
    
        console.log('table data****', JSON.stringify(result));
      });
  });