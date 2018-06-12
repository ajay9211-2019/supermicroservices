// load external files or modules.
var response  = require(appRoot+'/widget/response');
var table     = require(appRoot+'/widget/table');
var helper    = require(appRoot+'/widget/helper');
const viewsValue = 1;

// Get request Handler
module.exports.getRequestHandler = async function( event, context, callback ){
	
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

	var objWidgetData = await table.get( 'swidgets',{'userid':requestData.userid,'widgetid':requestData.widgetid} );
	
	if( typeof objWidgetData == "undefined" || objWidgetData.asinlist.length == 0 ){
		return callback( null , response.getJsonResponse( '',400,'Asinlist not found:widgets.') );
	}

	var objProductData = await table.getBatchProduct( objWidgetData.asinlist );
	
	if( !objProductData.sproducts ){
		return callback( null , response.getJsonResponse( '',400,'Products not found:sproducts.') );
	}

	var preparedHtml = await helper.prepareHtml( objProductData , objWidgetData );
	
	//update views users table & views table & swidgets
	objUserData.views   = viewsValue+parseInt( objUserData.views );
	objWidgetData.views = viewsValue+parseInt( objWidgetData.views );
	
	let viewData  = {
					'userid': objUserData.userid,
					'createtime':Date.now(),
					'widgetid':requestData.widgetid
					};
					
	table.updateViews( 'swidgets',{'userid':objUserData.userid, 'widgetid': objWidgetData.widgetid}, objWidgetData.views );				
	table.updateViews( 'susers',{'userid':objUserData.userid}, objUserData.views );
	table.put( 'sviews',viewData );

	delete objProductData; delete objWidgetData; delete viewData;delete objUserData;delete requestData;
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




