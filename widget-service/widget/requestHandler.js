// load external files or modules.
var response  = require('./response');
var table     = require('./table');

// Get request Handler
module.exports.getRequestHandler = async ( event, context, callback ) => {
	let responseData = await table.get( 'swidgets',{'userid':1,'widgetid':1});

	return callback( null , response.getJsonResponse( {'data':responseData} ) );
};

// Post request Handler
module.exports.postRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi post request'} ) );
};

// Put request Handler
module.exports.putRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi put request'} ) );
};