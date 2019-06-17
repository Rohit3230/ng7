var mysql = require('mysql');
var db = 'newMusic';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root'
});

var table = ('CREATE TABLE IF NOT EXISTS Artist (id INT(100) NOT NULL AUTO_INCREMENT, name TINYTEXT, PRIMARY KEY(id))');

connection.query('CREATE DATABASE IF NOT EXISTS ??', db, function(err, results) {
  if (err) {
    console.log('error in creating database', err);
    return;
  }

  console.log('created a new database');

  connection.changeUser({
    database : db
  }, function(err) {
    if (err) {
      console.log('error in changing database', err);
      return;
    }

    connection.query("INSERT INTO `artist`(`name`) VALUES ('Annu Patel')", function(err, result) {
        if (err) {
          console.log('error in creating tables', err);
          return;
        }
    
        console.log('table data****', JSON.stringify(result));
      });
    // connection.query(table, function(err) {
    //   if (err) {
    //     console.log('error in creating tables', err);
    //     return;
    //   }

    //   console.log('created a new table');
    // });
  });
});

module.exports = connection;