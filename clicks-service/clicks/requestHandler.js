// load external files or modules.
var response      = require('./response');
var table         = require('./table');
var helper        = require('./helper');

// GET request Handler  
module.exports.getRequestHandler = ( event, context, callback ) => {

	return callback( null , response.getJsonResponse( {'data':'Hi get request'} ) );
};

// POST request Handler  
module.exports.postRequestHandler = async ( event, context, callback ) => {

	var requestData = await helper.validateRequestData( event );
	if( false == requestData ){
		return callback( null , response.getJsonResponse( '',400,' Invalid request pathParameters.'  ) );	
	}

	var objUserData = await table.get( 'susers',{'userid':requestData.userid} );
	// validate user and accesstoken
	if( typeof objUserData == "undefined" ){
		return callback( null , response.getJsonResponse( '',400,'Invalid user.' ) );
	}
	if( objUserData.accesstoken != requestData.accesstoken || objUserData.accesstoken == '' ){
		return callback( null , response.getJsonResponse( '',400,'User authentication failed.' ) );
	}
    var prepareViewsData = {
				    		'userid':requestData.userid,
				    		'createtime':Date.now(),
				    		'widgetid':requestData.widgetid,
				    		'asin'    :requestData.asin
				    		};

    var responseData = table.put( "sclicks",prepareViewsData );
    let msg = 'failed';
    if( responseData.domain._eventsCount == 1  ){
    	msg = 'Success';
    }
	return callback( null , response.getJsonResponse( {'status': msg} ) );
};

// PUT request Handler 
module.exports.putRequestHandler = ( event, context, callback ) => {
   return callback( null , response.getJsonResponse( {'data':'Hi put request'} ) );
};