'use strict';

var path = require('path');
global.appRoot = path.resolve(__dirname);
var request   = require(appRoot+'/widget/requestHandler');
// entry point 
module.exports.widget = (event, context, callback) => {
 
  switch ( event.httpMethod ) {
    
    case "GET":
      return request.getRequestHandler( event, context, callback );
    break;
    default:
      return callback( null , { statusCode : 401 , message:" Invalid Request Method"});
    break;
  }

};
