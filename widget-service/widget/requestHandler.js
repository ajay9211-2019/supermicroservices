// load external files or modules.
var response     = require(appRoot+'/widget/response');
var table        = require(appRoot+'/widget/table');
var helper       = require(appRoot+'/widget/helper');
var traking 	 = require(appRoot+'/widget/traking');

// Get request Handler
module.exports.getRequestHandler = async function( event, context, callback ){
	// Validate request data

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
	// prepare traking id
	var trakingid = traking.getTrakingId( objWidgetData.asinlist[0].region,objUserData.trackingid,objUserData.planid );
	var preparedWidgetHtml = await helper.prepareWidgetHtml( objWidgetData , trakingid);
	//update views users table & views table & swidgets
	
	let intUserTotalViewvalue   = 1;
	let intWidgetTotalViewvalue = 1;

	if( typeof objWidgetData.views != 'undefined'){
		intWidgetTotalViewvalue = intWidgetTotalViewvalue+parseInt( objWidgetData.views );
	}
	if( typeof objUserData.views != 'undefined'){
		intUserTotalViewvalue = intUserTotalViewvalue+parseInt( objUserData.views );
	}
	
	let prepareViewsData  = {
							'userid': objUserData.userid,
							'createtime':Date.now(),
							'widgetid':requestData.widgetid
						};
					
	table.updateViews( 'swidgets',{'userid':objUserData.userid, 'widgetid': objWidgetData.widgetid}, intWidgetTotalViewvalue );				
	table.updateViews( 'susers',{'userid':objUserData.userid}, intUserTotalViewvalue );
	table.put( 'sviews',prepareViewsData );
	console.log("=======return template========");
	
	delete objWidgetData; delete prepareViewsData;delete objUserData;delete requestData;
	return callback( null , response.getHtmlResponse( preparedWidgetHtml ) );
};





