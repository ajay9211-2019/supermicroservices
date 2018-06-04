'use strict';
var request   = require('./views/requestHandler');
// entry point 
module.exports.views = (event, context, callback) => {
 
  switch ( event.httpMethod ) {
    
    case "GET":
      return request.getRequestHandler( event, context, callback );
    break;
    case "POST":
      return request.postRequestHandler( event, context, callback );
    break;
    case "PUT":
      return request.putRequestHandler( event, context, callback );
    break;
    
    default:
      return callback( null , { statusCode : 401 , message:" Invalid Request Method"});
    break;
  }

};
