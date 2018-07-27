'use strict';
const requestHandler    = require( './product/requestHandler');

module.exports.productScraper = (event, context, callback) => {
  
  switch ( event.httpMethod ) {
    
    case "GET":
      return requestHandler.requestHandler( event, context, callback );
    break;
  default:
      return callback( null , {body : { statusCode : 500 , message:" Invalid Request Method"}} );
    break;
  }

};
