const request           = require('axios');
var ratingExtract       = require('./ratingExtract');

module.exports.requestHandler = ( event, context, callback) => {

	var asin   = event.pathParameters.asin;
  	var region = event.pathParameters.region;

	var productUrl = 'https://www.amazon.'+region+'/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&asin='+asin;
	
	request( productUrl ).then( ( { data } ) => {
		  
        var reviesData = ratingExtract.extractRatings( data , region );
        
        const response = {
                statusCode: 200,
                headers: {
                        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                      },
                body: JSON.stringify({
                 data: {"ratings": reviesData},
                 statusCode: 200,
                }),
        };

        return callback(null, response);
      
    
    }).catch(function (error) {

         const response = {
                statusCode: 200,
                headers: {
                        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                      },
                body: JSON.stringify({
                 data: {"error": "url resource not found. "},
                 statusCode: 404,
                }),
        };
      callback(null, response );
  });
};