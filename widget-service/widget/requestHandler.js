// load external files or modules.
var response  = require('./response');
var table     = require('./table');
var helper    = require('./helper');

// Get request Handler
module.exports.getRequestHandler = async ( event, context, callback ) => {
	
	var requestData = await helper.validateRequestData( event );
	if( false == requestData ){
		return callback( null , response.getJsonResponse( '',400,' Invalid request pathParameters.'  ) );	
	}
	
	var objWidgetData = await table.get( 'swidgets',{'userid':requestData.userid,'widgetid':requestData.widgetid} );
	
	if( typeof objWidgetData == "undefined" || objWidgetData.asinlist == '' ){
		return callback( null , response.getJsonResponse( '',400,'Asinlist not found:swidgets.') );
	}

	var objProductData = await table.batchProductGet( objWidgetData.asinlist );
	
	if( !objProductData.sproducts ){
		return callback( null , response.getJsonResponse( '',400,'Products not found:sproducts.') );
	}

	var preparedHtml = await helper.prepareHtml( objProductData , objWidgetData );
	delete objProductData; delete objWidgetData;

	return callback( null , response.getHtmlResponse( preparedHtml  ) );
	
};

// Post request Handler
module.exports.postRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi post request'} ) );
};

// Put request Handler
module.exports.putRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi put request'} ) );
};