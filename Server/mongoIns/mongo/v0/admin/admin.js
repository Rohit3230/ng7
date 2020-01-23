var express = require('express');
var router = express.Router();
// var QUERIES = require("../../model/sqlQueries");
var error = require('../../../../Common/error');
var Sender = require('../../../../Common/sender');
var Sender = require('../../../../Common/sender');

router.get('/', (req, res) => {
    getDBConnection(function(err, db){
        db.collection('quotes').find().toArray((err, result) => {
            if (err) return console.log(err)
            // res.send('Server working...!')
            Sender.sendResponse(req,res,result,err);
            //res.render('index.ejs', {quotes: result})
        });
    });
});


router.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.send('Server working...!')
      //res.render('index.ejs', {quotes: result})
    })
  })
  
  router.get('/getQuotes', (req, res) => {
      // return all quotes with having id also
      console.log('API FOR GET ALL QUOTE.');
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // console.log('result---->',result);
      // res.send(result)
      Sender.sendResponse(req,res,result,err);
    })
  })
  
  router.get('/getSpecificQuote', (req, res) => {
    // return all quotes without having id
    console.log('API FOR GET SPACIFIC QUOTE.');
    
    var id = req.query.id;
  
    db.collection('quotes').find({"_id": new ObjectId(id)}).toArray(function(err, results){
      if (err) return console.log(err)
      res.send(results)
    });
  
  })
  
  router.get('/getQuotesWithOutId', (req, res) => {
    // return all quotes without having id
    db.collection('quotes').find( {}, { _id: 0, name: 1, quote: 1 }).toArray(function(err, result) {
      if (err) return console.log(err)
      console.log('GotResult******',result);
      res.send(result)
      // db.close();
      // res.redirect('/')
    })
  })
  
  
  router.post('/postQuote', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  })
  
  router.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate({name: 'Yoda'}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  });
  
  router.delete('/quotes', (req, res) => {
    console.log('delete req-->',req);
    db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('A darth vadar quote got deleted')
    })
  });

module.exports = router;