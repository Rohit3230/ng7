OK                          = "0";
NOK                         = "1";

var _errorMsg = {
    "0": "successful",
    "1": "validation error",
}

var getCodeDetails = function(errorObj,field){
    //console.log("Code in getCodeDetails ======> "+code);
    //console.log("Code in getCodeDetails  err msg======> "+_errorMsg[code]);
    // TODO : Create error logs for the files
    
    var code;
    if (errorObj !== undefined && errorObj !== null) {
           //console.log("Error is ===> "+errorObj);
        //    console.log("Error type is ===> " + typeof errorObj);
        if (Array.isArray(errorObj) ) {
            console.log("Error is array");
            code = errorObj[0];
            field = errorObj[1];
        } else  {
            code = errorObj;
        }
    }   
       

    field = field === undefined ? "" : field;
    
    if( _errorMsg[code]!==undefined){
        return {code: code, message: field+_errorMsg[code]};
    }else{
        console.log(code);
        return {code: "X001", message: "We’re sorry. There was an error. Please try again. "};
    }
};

module.exports = {
    getCodeDetails: getCodeDetails
};