var express = require('express');
var router = express.Router();
var QUERIES = require("../../model/sqlQueries");
var Sender = require('../../../Common/sender');

router.get('/', function(req, res) {
    runQuery(QUERIES.getAdminList, [], function (err, result) { 
        if(
            err
        ){
            console.error('RUN QUERY ERROR******', JSON.stringify(err));
            Sender.sendResponse(req,res,null,err);
        }else{
            Sender.sendResponse(req,res,result);
            // res.send({ status: 'OK', data : result });
        }
    });  
});

router.post('/', function(req, res) {
    console.log('INIT GET API*****');
    runQuery('', [], function (err, result) {
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