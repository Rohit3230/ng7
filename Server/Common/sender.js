/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var errors = require("./error.js");
// require('../sqlInstance/config/log4jsLogger.js');
var kafkaPublisher;
var app = require('express')();
var Sender  = function(){

};

Sender.sendResponseLegacy = function(req,resToSend,body,errCode,response){
    
    var code = response !==undefined  ? response.statusCode : undefined;
    
    if(code === 200 || code === 304 || body!==undefined)
        return resToSend.status(code).send(body);
    else
        return resToSend.status(500).send("Some error occured. Please try after sometime");
    
//    var data = {}
//
//       if(result !== undefined && result!==null)
//            data.data = result;
//
//
//       // When the error code is to be bypassed by the main instance. and whole status is returned by the passive instances.
//       if(errCode!==undefined && errCode!==null &&errCode.status!==undefined){
//           console.log("Type of errCode status ===> "+typeof errCode.status);
//           data.status = errCode.status;
//       }
//       else // FOr normal cases when error code is returned
//            data.status = errors.getCodeDetails(errCode!==undefined ? errCode : OK);
//
//
//       console.log("Sending data =======> "+JSON.stringify(data));
//       res.send(data);

};

/**
 *
 * @param {type} req
 * @param {type} res
 * @param {type} data
 * @param {type} errCode : Send undefined if there is no error. Default is response ok. This can also be the array object. In that case the response is sent as is
 * @returns {undefined} Nothing. Sends the result to client
 */
Sender.sendResponse = function(req,res,result,errCode){ 
    
    var data = {}
       // if(errCode && errCode!==OK) data.result = null ; // THis may be turned on for production
       if(errCode && errCode!==OK) { // THis may be turned off for production
           data.debug = result && result.debug ? result.debug :  result;
       }
        // console.log("Result in sendResponse =====> "+JSON.stringify(result));
        if(
            result
            &&
            result.sendSameResponse
        ){
            delete result.sendSameResponse;
            return res.send(result);
        }
       if(result !== undefined && result!==null){
            data.data = result;
            data.data.status = undefined;
        }else{
            data.data = {} // Data never goes empty.
        }
        
       // When the error code is to be bypassed by the main instance. and whole status is returned by the passive instances.
       if(errCode!==undefined && errCode!==null &&errCode.status!==undefined){
           //console.log("Type of errCode status ===> "+typeof errCode.status);
           data.status = errCode.status;
       }
       else // FOr normal cases when error code is returned
            data.status = errors.getCodeDetails(errCode!==undefined && errCode!==null ? errCode : OK);

       try{ // To catch the circular json object
            //console.log("Sending data =======> "+JSON.stringify(data));
        }catch(err){
            console.error("Err in pringting json stringify =====> "+err);
            console.error("Erroneous Data is ======+> "+data);
        }
        //console.log("======DATA FROM SENDER===============>>>>>"+JSON.stringify(data))
        
        if(errCode
            // &&
            // errCode != "0"
        ){
           // Logger.error(JSON.stringify(res));
            // console.log("\n\n==========REQ BASE_URL IN Send Response======================",req.baseUrl, req.method, req.body, req.data)
            console.error("errCode in send response =======+> "+JSON.stringify(errCode));
            switch(errCode){
            case NORECORDS : 
            console.error("Case NO RECORDS in sender");
            case OK :  return res.send(data);
            case INREVIEW: return res.send(data);
            
            case NILTOKEN:
            case AUTHENTICATION_ERROR: return res.status(401).send(data); 
            case AUTHORIZATION_ERROR: return res.status(403).send(data);
            case NOT_FOUND : return res.status(404).send(data);
            default : return res && res.status(400) && res.status(400).send ? res.status(400).send(data) : '';
            }
        } 
        
        if(
            req.get('host')
                &&
                (
                    (req.get('host').indexOf(":4000"))>=0
                    ||
                    req.get('host').indexOf("api.yogems.com") >=0
                    ||
                    req.get('host').indexOf("api.yogems.net") >=0
                )
            ){ // Request success
            console.log("host =====> "+req.get('host'));
            if(!kafkaPublisher)
                kafkaPublisher = require("./kafkaPublisher");
            kafkaPublisher.publishMessage({req:req,res:res,result:result});
        }

       // console.log("======DATA FROM SENDER===============>>>>>"+JSON.stringify(data))
       
        return res.send(data);

};

module.exports = Sender;
