var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql'); 
var fs = require('fs');
var startTrans;

var port = process.env.PORT || 3306;   
var dbPool = mysql.createPool({
    // host: "localhost",
    host: "remotemysql.com",
    user: "Ha9u1iXQnq",
    password: "ydKDFrGT1Y",
    database: "Ha9u1iXQnq",
    port : port
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, Token, Branch, Service, DocumentHash,categoryhash,servicehash,maxAge,offlinetoken');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
}

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true }));
app.use(bodyParser.json({limit: '5000mb'}));;
app.use(allowCrossDomain);
app.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});
addRoutes('api',app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("404 error handler called");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



function addRoutes(folderName, app) { 
    fs.readdirSync(folderName).forEach(function(file) {

        var fullName = path.join(folderName, file);
        var stat = fs.lstatSync(fullName);
        var name = '';

        if (stat.isDirectory())
        {
            addRoutes(fullName, app);
        }
        else if ( fullName.substr(fullName.lastIndexOf('.') + 1) === 'js')  //.toLowerCase()
        {
            name = '/'+fullName.substr(0, fullName.lastIndexOf('.'))+'/';
            app.use(name, require('./'+fullName));
            //console.log(name+' :: '+fullName);
        }
    });
}



insertAsync = function (conn, query, params) {


    return function (callback) {
        console.log("insertAsync Query ====> " + query);
        // console.log("Params ====> "+JSON.stringify(params));
        var randomValue = "QueryTime_" + (Math.round((new Date()).getTime() / 1000));
        console.time(randomValue);
        conn.query(query, params, function (err, result) {
            console.timeEnd(randomValue);
            if (err) return callback(err);
            var id = result.insertId;
            callback(null, id);
        });
    };


};

startTrans = function startTrans(mainCallback) {
    dbPool.getConnection(function (poolErr, myConn) {
        if (poolErr)
            return mainCallback(poolErr);

        myConn.beginTransaction(function (transErr) {
            if (transErr) return mainCallback(transErr);

            mainCallback(null, myConn);
        });
    });
};


runQuery = function runQuery(query, paramArr, callback) {
    //    console.log("query ===> "+query);
    //    console.log("paramArr ====> "+typeof paramArr);
    //    console.log("callback ====>",callback);
    if (typeof paramArr !== 'object')
        throw new Error("ParamArr not passed");
    console.log("runQuery Query ====> " + query);
    console.log("Params ====> " + JSON.stringify(paramArr)); 

    let stTime = new Date().getTime();

    dbPool.getConnection(function (err, conn) { 
        if (err) 
            return callback(err);

        //console.log("Running query");
        conn.query(query, paramArr, function (err, queryResult) {
            //    console.log("Releasing connection");
            let endTime = new Date().getTime();
            console.log("Query time (ms )   =======> " + (endTime - stTime));
            conn.release();
            callback(err, queryResult);
        });

    });
};

executeQuery = function (tx, query, paramArr, callback) {
    if (arguments.length === 3) {
        runQuery(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4 && tx) {
        runQueryTrans(tx, query, paramArr, callback);
    } else if (arguments.length === 4 && !tx) {

        runQuery(query, paramArr, callback);

    } else {
        var error = new Error("Called with invalid params !!!");
        console.log(error.stack);
        throw error;
    }
};

runQueryTrans = function runQuery(tx, query, paramArr, callback) {
    //    console.log("query ===> "+query);
    //    console.log("paramArr ====> "+typeof paramArr);
    //    console.log("callback ====>",callback);
    if (typeof paramArr !== 'object')
        throw new Error("ParamArr not passed");

    console.log("runQueryTrans Query ====> " + query);
    // console.log("Params ====> "+JSON.stringify(paramArr));

    //console.log("Running query");
    var randomValue = "QueryTime_" + (Math.round((new Date()).getTime() / 1000));
    console.time(randomValue);
    tx.query(query, paramArr, function (err, queryResult) {
        console.timeEnd(randomValue);
        callback(err, queryResult);
    });

};

mainDatabaseAsyncCallback = function mainDatabaseAsyncCallback(err, myConn, callback, result) {



    //console.log("myConn inside callback====> "+myConn);
    if (err) {
        console.log(JSON.stringify(err))
        Logger.error(JSON.stringify(err));
        myConn.rollback();
        myConn.release();
        //errorMsg = dbError.getCustomMsg("MYSQLROLLBACK");
        callback(err, result);
    } else {
        myConn.commit(function (err) {

            if (err) {
                console.log(JSON.stringify(err))
                //errorMsg = dbError.getCustomMsg("MYSQLROLLBACK");
                //Logger.error(JSON.stringify(errorMsg));
                myConn.rollback();
                myConn.release();
                callback(MYSQLROLLBACK);
            } else {
                myConn.release();
                callback(null, result);
            }
        });
    }
};


// app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


module.exports = app;