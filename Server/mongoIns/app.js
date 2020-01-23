// var express = require('express');
// var path = require('path'); 
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var compression = require("compression"); 
// var app = express();
// var mongoose = require('mongoose');
// var mongoAddr = '';
// var options = {
//     poolSize: 100
//     // useMongoClient : true 
// }; 
// connectToMongo = function(){
//     mongoose.connect( mongoAddr,options, function(err){ 
//         if(err){
//             return console.log("Error connecting to mongo db ====> "+err);
//         }
//         else {
//             console.log("Connected with mongodb(YoMongo) !");
//         };
//     });
// };
// connectToMongo();  
 
// // app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// app.use(compression());

// // app.use('/', routes);
// // app.use('/mongo/v0/user/', require("./mongo/v0/user/user"));
// // //app.use('/mongo/v0/user/profile/', require("./mongo/v0/user/user"));
// // app.use('/mongo/v0/user/tournament/', require("./mongo/v0/user/tournament"));
// // app.use('/mongo/v0/user/tournamentNew/', require("./mongo/v0/user/tournamentNew"));
// // app.use('/mongo/v0/user/match/', require("./mongo/v0/user/match"));
// // app.use('/mongo/v0/user/pointTable/', require("./mongo/v0/user/pointTable"));
// // app.use('/mongo/v0/user/superTournament/', require("./mongo/v0/user/superTournament"));
// // app.use('/mongo/v0/user/provider/', require("./mongo/v0/user/provider"));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
 
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
 
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;






const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var Sender = require('../Common/sender');
var db

MongoClient.connect('mongodb://public:public@ds137826.mlab.com:37826/node-crud', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

// app.set('view engine', 'html')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/mongo/v0/admin/', require("./mongo/v0/admin/admin"));

getDBConnection = function getDBConnection(callback) {
    callback(null, db);
};

module.exports = app;