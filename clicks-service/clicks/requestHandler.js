// load external files or modules.
var response      = require('./response');
var table         = require('./table');
var helper        = require('./helper');

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
	if( objUserData.accesstoken != requestData.accesstoken ){
		return callback( null , response.getJsonResponse( '',400,'User authentication failed.' ) );
	}
	var widgetAnalytics   = await table.get( "swidgetanalytics",{'widgetid': requestData.widgetid } );
	
    // let objUserTotalViewvalue   = {'super': 1, 'user':1};
	let objWidgetTotalViewvalue = {'super': 1, 'user':1};
	if( 'super' == requestData.trackingby ){
		objWidgetTotalViewvalue.user = 0;
		// objUserTotalViewvalue.user   = 0;
	}else{
		objWidgetTotalViewvalue.super = 0;
		// objUserTotalViewvalue.super   = 0;
	}
	if( typeof widgetAnalytics !== 'undefined' && typeof widgetAnalytics.clicks !== 'undefined' ){
		
		if( 'super' == requestData.trackingby ){
			objWidgetTotalViewvalue.super = 1+parseInt( widgetAnalytics.clicks.super );
			objWidgetTotalViewvalue.user  = widgetAnalytics.clicks.user;
		}else{
			objWidgetTotalViewvalue.super =  widgetAnalytics.clicks.super;
			objWidgetTotalViewvalue.user  = 1+parseInt( widgetAnalytics.clicks.user );
		}
	}

	let prepareViewsData = {
				    		'userid':requestData.userid,
				    		'createtime':Date.now(),
				    		'widgetid':requestData.widgetid,
				    		'asin'    :requestData.asin,
				    		'trakingby':requestData.trackingby
				    		};
	var responseData = table.put( "sclicks",prepareViewsData );	
	table.updateClicks( 'swidgetanalytics',{'widgetid': requestData.widgetid }, objWidgetTotalViewvalue );    		
   
	return callback( null , response.getJsonResponse( {'status': responseData} ) );
};

// PUT request Handler 
