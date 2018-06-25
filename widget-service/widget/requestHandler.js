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
	// get product data from product and map data widget products;
	

	var objProducts = await table.getBatchProduct( objWidgetData.asinlist );

	let lastSynctTime = '';
	
	if( typeof objProducts != "undefined" ){
		// prepare widget products
		var preparedWidgetProducts = await helper.prepareWidgetProducts( objProducts.sproducts , objWidgetData.data.products );
		if( typeof preparedWidgetProducts.products != "undefined" ){
			objWidgetData.data.products = preparedWidgetProducts.products;
			lastSynctTime = preparedWidgetProducts.lastSynctTime;
		}
	}

	// prepare traking id
	var trakingid = await traking.getTrakingId( objWidgetData.asinlist[0].region,objUserData.trackingid,objUserData.planid );
	var preparedWidgetHtml = await helper.prepareWidgetHtml( objWidgetData , trakingid , lastSynctTime,traking.getSuperTrakingIds(),objUserData.trackingid );
	//update views users table & views table & swidgets
	
	let objUserTotalViewvalue   = {'super': 1, 'user':1};
	let objWidgetTotalViewvalue = {'super': 1, 'user':1};

	if( typeof objWidgetData.views != 'undefined'){
		if( true == trakingid['super'] ){
			objWidgetTotalViewvalue.super = 1+parseInt( objWidgetData.views.super );
			objWidgetTotalViewvalue.user  = objWidgetData.views.user;
		}else{
			objWidgetTotalViewvalue.super =  objWidgetData.views.super;
			objWidgetTotalViewvalue.user  = 1+parseInt( objWidgetData.views.user );
		}
	}

	if( typeof objUserData.views != 'undefined'){
		if( true == trakingid['super'] ){
			objUserTotalViewvalue.super = 1+parseInt( objUserData.views.super );
			objUserTotalViewvalue.user  = objUserData.views.user;
		}else{
			objUserTotalViewvalue.super =  objUserData.views.super;
			objUserTotalViewvalue.user  = 1+parseInt( objUserData.views.user );
		}
	}

	let strTrakingBy = true == trakingid['super'] ? 'super':'user';
	let prepareViewsData  = {
							'userid': objUserData.userid,
							'createtime':Date.now(),
							'widgetid':requestData.widgetid,
							'trakingby':strTrakingBy
						};
					
	table.updateViews( 'swidgets',{'userid':objUserData.userid, 'widgetid': objWidgetData.widgetid}, objWidgetTotalViewvalue );				
	table.updateViews( 'susers',{'userid':objUserData.userid}, objUserTotalViewvalue );
	table.put( 'sviews',prepareViewsData );
	console.log("=======return template========");
	
	delete objWidgetData; delete prepareViewsData;delete objUserData;delete requestData;delete objUserTotalViewvalue;delete objWidgetTotalViewvalue;
	return callback( null , response.getHtmlResponse( preparedWidgetHtml ) );
};





