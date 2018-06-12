
var rating    = require('./rating');
var response  = require('./response');
const sleep = require('util').promisify(setTimeout); 

module.exports.requestHandler = async( event, context, callback) => {

	var asin   = event.pathParameters.asin;
  var region = event.pathParameters.region;
  var productUrl = 'https://www.amazon.'+region+'/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&asin='+asin;

  var ratingResponse = await rating.prepareRating( productUrl ,region );
  
  if( typeof ratingResponse.error != 'undefined' || true == ratingResponse.error ){
     console.log( "wait 2 sec and retry prepareRating.");
      await sleep(2000);
      let ratingRes = await rating.prepareRating( productUrl ,region );
      return callback( null , response.getJsonResponse( ratingRes ) );

  }else{
    return callback( null , response.getJsonResponse( ratingResponse ) );
  }
  
};