var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    console.log('INIT GET API*****');
    runQuery('SELECT * FROM `admin`', [], function (err, result) {
        // console.log(err, '********QUERY*********', result);
        if(
            err
        ){
            console.error('RUN QUERY ERROR******', JSON.stringify(err));
            res.send(err);
        }else{
            res.send({ status: 'OK', data : result });
        }
    });  
});

module.exports = router;