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
	if( objUserData.accesstoken != requestData.accesstoken || objUserData.accesstoken == '' ){
		return callback( null , response.getJsonResponse( '',400,'User authentication failed.' ) );
	}
	var objWidgetData = await table.get( 'swidgets',{'userid':requestData.userid,'widgetid':requestData.widgetid} );
	
	if( typeof objWidgetData == "undefined" ){
		return callback( null , response.getJsonResponse( '',400,'Widgets not found.') );
	}

    var prepareViewsData = {
				    		'userid':requestData.userid,
				    		'createtime':Date.now(),
				    		'widgetid':requestData.widgetid,
				    		'asin'    :requestData.asin
				    		};
	let intTotalClickvalue = 1;
	if( typeof objWidgetData.clicks != 'undefined'){
		intTotalClickvalue = intTotalClickvalue+parseInt( objWidgetData.clicks );
	}	    		
    
	table.updateClicks( 'swidgets',{'userid':objUserData.userid, 'widgetid': objWidgetData.widgetid}, intTotalClickvalue );				
	// table.updateViews( 'susers',{'userid':objUserData.userid}, objUserData.views );
	var responseData = table.put( "sclicks",prepareViewsData );

    let msg = 'failed';
    if( responseData.domain._eventsCount == 1  ){
    	msg = 'Success';
    }
	return callback( null , response.getJsonResponse( {'status': msg} ) );
};

// PUT request Handler 
