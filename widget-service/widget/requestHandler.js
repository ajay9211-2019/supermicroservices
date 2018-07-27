// load external files or modules.
var response     = require(appRoot+'/widget/response');
var table        = require(appRoot+'/widget/table');
var helper       = require(appRoot+'/widget/helper');
var traking 	 = require(appRoot+'/widget/traking');

// Get request Handler
module.exports.getRequestHandler = async function( event, context, callback ){
	// Validate request data

	try{
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
			return callback( null , response.getJsonResponse( '',400,'Widget not found.') );
		}

		if( objWidgetData.asinlist.length == 0 ){
			return callback( null , response.getHtmlResponse( "No products." ) );
		}

		// get realtime data from sproducts and map data to widget products;
		var objProducts   = await table.getBatchProduct( objWidgetData.asinlist );
		let lastSynctTime = '';

		// prepare widget products
		var preparedWidgetProducts = await helper.prepareWidgetProducts( objProducts.sproducts , objWidgetData.data.products );
		if( typeof preparedWidgetProducts.products != "undefined" ){
			objWidgetData.data.products = preparedWidgetProducts.products;
			lastSynctTime = preparedWidgetProducts.lastSynctTime;
		}
		
		// prepare traking id
		var trakingid 			= await traking.getTrakingId( objWidgetData.asinlist[0].region,objUserData.trackingid,objUserData.planid );
		var regionCurrencyCode  = traking.getCurrencySymbolByRegion( objWidgetData.asinlist[0].region );
		var preparedWidgetHtml  = await helper.prepareWidgetHtml( objWidgetData , trakingid , lastSynctTime,traking.getSuperTrakingIds(),objUserData.trackingid, regionCurrencyCode, objUserData.isgeolocalize);
		//update views users table & views table & widgetAnalytics
		var widgetAnalytics   = await table.get( "widgetAnalytics",{'widgetid': objWidgetData.widgetid } );

		// let objUserTotalViewvalue   = {'super': 1, 'user':1};
		let objWidgetTotalViewvalue = {'super': 1, 'user':1};
		if( true == trakingid['super'] ){
			objWidgetTotalViewvalue.user = 0;
			// objUserTotalViewvalue.user   = 0;
		}else{
			objWidgetTotalViewvalue.super = 0;
			// objUserTotalViewvalue.super   = 0;
		}

		if( typeof widgetAnalytics !="undefined" && typeof widgetAnalytics.views != 'undefined'){
			
			if( true == trakingid['super'] ){
				objWidgetTotalViewvalue.super = 1+parseInt( widgetAnalytics.views.super );
				objWidgetTotalViewvalue.user  = widgetAnalytics.views.user;
			}else{
				objWidgetTotalViewvalue.super =  widgetAnalytics.views.super;
				objWidgetTotalViewvalue.user  = 1+parseInt( widgetAnalytics.views.user );
			}
		}
		
		// if( typeof objUserData.views != 'undefined'){
		// 	if( true == trakingid['super'] ){
		// 		objUserTotalViewvalue.super = !isNaN( objUserData.views.super ) ? 1+parseInt( objUserData.views.super ) : 1;
		// 		objUserTotalViewvalue.user  = !isNaN( objUserData.views.user ) ? objUserData.views.user : 0;
		// 	}else{
		// 		objUserTotalViewvalue.super =  !isNaN( objUserData.views.super )  ? objUserData.views.super : 0;
		// 		objUserTotalViewvalue.user  = !isNaN( objUserData.views.user )  ? 1+parseInt( objUserData.views.user )  : 1;
		// 	}
		// }
		
		let strTrakingBy = true == trakingid['super'] ? 'super':'user';
		let prepareViewsData  = {
								'userid': objUserData.userid,
								'createtime':Date.now(),
								'widgetid':requestData.widgetid,
								'trakingby':strTrakingBy
							};

		table.updateViews( 'swidgetanalytics',{'widgetid': objWidgetData.widgetid }, objWidgetTotalViewvalue );				
		// table.updateViews( 'susers',{'userid':objUserData.userid}, objUserTotalViewvalue );
		table.put( 'sviews',prepareViewsData );
		delete objWidgetData; delete prepareViewsData;delete objUserData;delete requestData;delete objUserTotalViewvalue;delete objWidgetTotalViewvalue;
		
		console.log("=======return template========");
		return callback( null , response.getHtmlResponse( preparedWidgetHtml ) );
   
   	}catch( err ){
      return callback( null , response.getJsonResponse( '',400,'getting exception.') );
	}
};





