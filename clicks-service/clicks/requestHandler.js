// load external files or modules.
var response      = require('./response');
var table         = require('./table');
var helper        = require('./helper');

// POST request Handler  
module.exports.postRequestHandler = async ( event, context, callback ) => {
	console.log( "sfsf");
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
	var objWidgetData = await table.get( 'swidgets',{'userid':requestData.userid,'widgetid':requestData.widgetid} );
	
	if( typeof objWidgetData == "undefined" ){
		return callback( null , response.getJsonResponse( '',400,'Widgets not found.') );
	}

    let objUserTotalViewvalue   = {'super': 1, 'user':1};
	let objWidgetTotalViewvalue = {'super': 1, 'user':1};
	if( 'super' == requestData.trackingby ){
		objWidgetTotalViewvalue.user = 0;
		objUserTotalViewvalue.user   = 0;
	}else{
		objWidgetTotalViewvalue.super = 0;
		objUserTotalViewvalue.super   = 0;
	}
	if(  typeof objWidgetData.clicks !== 'undefined' ){
		
		if( 'super' == requestData.trackingby ){
			objWidgetTotalViewvalue.super = 1+parseInt( objWidgetData.clicks.super );
			objWidgetTotalViewvalue.user  = objWidgetData.clicks.user;
		}else{
			objWidgetTotalViewvalue.super =  objWidgetData.clicks.super;
			objWidgetTotalViewvalue.user  = 1+parseInt( objWidgetData.clicks.user );
		}
	}

	if( typeof objUserData.clicks !== 'undefined' ){
		
		if( 'super' == requestData.trackingby ){
			objUserTotalViewvalue.super = 1+parseInt( objUserData.clicks.super );
			objUserTotalViewvalue.user  = objUserData.clicks.user;
		}else{
			objUserTotalViewvalue.super =  objUserData.clicks.super;
			objUserTotalViewvalue.user  = 1+parseInt( objUserData.clicks.user );
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
    
	table.updateClicks( 'swidgets',{'userid':objUserData.userid, 'widgetid': objWidgetData.widgetid}, objWidgetTotalViewvalue );				
	table.updateClicks( 'susers',{'userid':objUserData.userid}, objUserTotalViewvalue );
	
	return callback( null , response.getJsonResponse( {'status': responseData} ) );
};

// PUT request Handler 
