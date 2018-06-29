'use strict';


const requestHandler    = require( './rating/requestHandler');

module.exports.rating = (event, context, callback) => {
  
	switch ( event.httpMethod ) {
    
    case "GET":
      return requestHandler.requestHandler( event, context, callback );
    break;

    default:
      return callback( null , { statusCode : 500 , message:" Invalid Request Method"} );
    break;
  }
  
};
