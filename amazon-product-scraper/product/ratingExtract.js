const cheerio  = require('cheerio');
const moment   = require('moment');

module.exports.extractRatings = ( html , region) => {
  
 const $    = cheerio.load(html);
  var rating = $('.a-size-base').html();
  var revies = $('.a-link-emphasis').html();
  revies     = revies.replace(",","");
  try {

        rating = rating.replace("\n","");
        rating = rating.replace(/ /g,'');
         
        if( region == 'co.jp'){
          rating = rating.split(";");
          rating = rating[rating.length-1];
          rating = rating.replace("\n","");
          
        }else{
        
          rating = rating.split("");
          
          if( rating.length > 0 ){
            rating = rating[0]+rating[1]+rating[2];
          }
          let matches = revies.match(/\d+/g);
          if ( matches != null) {
           revies = revies.match(/\d+/g).map(Number);
          }else{
            revies = 0;
          }

        }

        var response = {
                  "star": parseFloat( rating ),
                  "total_reviews":parseInt( revies )
                };

        return response;

     } catch( err ){
      
        var response = {
                  "error":"getting exception."
                };

      return response;
    }
};


module.exports.scrapExtractRatings = ( html , region) => {
  
  const $    = cheerio.load(html);
  let rating = $('#centerCol #acrPopover').attr('title');
  let revies = $('#centerCol #acrCustomerReviewText').html();
  let price         = $('#price #priceblock_ourprice').text();
  let comparePrice  = $('#price .a-text-strike').text();
  let availability  = $('#availability').text();
   availability     = availability.trim();
   availability = availability.toLowerCase();
   // availability     = availability.search("in stock");
   // if( availability != -1 ){
   //    availability = 1;
   // }else{
   //  availability = 0;
   // }
   price            =  price.trim().replace(",","");
   comparePrice     = comparePrice.trim().replace(",","");

  if( revies !== null ){
    revies     = revies.replace(",","");
  }


// console.log( html );
  // try {
  
    if( rating !== undefined ){
     
      rating = rating.split("");
          
      if( rating.length > 0 ){
        rating = rating[0]+rating[1]+rating[2];
      }
    }else{
      rating = 0;
    }
     
    if( revies !== null ){
      
      let matches = revies.match(/\d+/g);
      if ( matches != null) {
        revies = revies.match(/\d+/g).map(Number);
      }else{
        revies = 0;
      }
    }else{
      revies = 0;
    }

    let response = {
                  "star": parseFloat( rating ),
                  "total_reviews":parseInt( revies ),
                  "product":{
                          "price":price,
                          "compare_price":comparePrice,
                          "availability":availability
                          },
                };

      return response;

    // } catch( err ){
      
    //     var response = {
    //               "error":"getting exception."
    //             };

    //   return response;
    // }

};






