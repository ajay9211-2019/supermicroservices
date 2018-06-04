// load external files or modules.
var response  = require('./response');

module.exports.getRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi get request'} ) );
};

module.exports.postRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi post request'} ) );
};

module.exports.putRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi put request'} ) );
};