
var rating    = require('./rating');
var response  = require('./response');
const sleep   = require('util').promisify(setTimeout); 
const proxyKey = '75725200620753969272101496870389';

module.exports.requestHandler = async( event, context, callback ) => {

	var asin   = event.pathParameters.asin;
  var region = event.pathParameters.region;
  var productUrl = 'https://www.amazon.'+region+'/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&asin='+asin;

  var ratingResponse = await rating.prepareRating( productUrl ,region );
  
  if( typeof ratingResponse.error != 'undefined' || true == ratingResponse.error ){
     console.log( "wait 2 sec and retry prepareRating.");
      await sleep(2000);
      let proxyUrl = 'https://api.scraperapi.com/?key='+proxyKey+'&url='+productUrl;
      let ratingRes = await rating.prepareRating( productUrl ,region );
      // if rating failed second time than we scraped data
      if( typeof ratingRes.error != 'undefined' || true == ratingRes.error ){
          // prepare product url for scraping
          productUrl ='https://www.amazon.'+region+'/dp/'+asin;
          console.log( "scraping data....");
          ratingRes = await rating.scrapRating( productUrl );
           // if rating failed third time than we return -1 data
          if( typeof ratingRes.error != 'undefined' || true == ratingRes.error ){
            console.log( "scraping failed....");
            ratingRes = {
                        "star": -1,
                        "total_reviews":-1
                      };
          }
        return callback( null , response.getJsonResponse( ratingRes ) );
      }else{
          return callback( null , response.getJsonResponse( ratingRes ) );
      }

  }else{
    return callback( null , response.getJsonResponse( ratingResponse ) );
  }
  
};