
var product    = require('./product');
var Response  = require('./response');
const sleep   = require('util').promisify(setTimeout);
const proxyKey = '75725200620753969272101496870389';

module.exports.requestHandler = async( event, context, callback ) => {

	var asin        = event.pathParameters.asin;
  var region      = event.pathParameters.region;
  var productUrl  = 'https://www.amazon.'+region+'/dp/'+asin;
  var response    = await product.scrapProduct( productUrl ,region );
   
  if( typeof response.error != 'undefined' || true == response.error ){
    let proxyUrl = 'https://api.scraperapi.com/?key='+proxyKey+'&url='+productUrl;
    console.log( "by proxy retry scrap product.");

    response = await product.scrapProduct( proxyUrl ,region );
    if( typeof response.error != 'undefined' || true == response.error ){
      console.log( "wait sec and retry scrap product.");
      sleep( 5 );
      response = await product.scrapProduct( productUrl ,region );

      if( typeof response.error != 'undefined' || true == response.error ){
          response = {
                      "product":{
                              "price":"",
                              "compare_price":"",
                              "availability":-1,
                              "availability_text":"",
                              // "text":capcha
                              }
                      };
          }
      }

  }

  return callback( null , Response.getJsonResponse( response ) );
};