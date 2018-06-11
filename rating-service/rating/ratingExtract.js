const cheerio  = require('cheerio');
const moment   = require('moment');

module.exports.extractRatings = ( html , region) => {
  
 const $    = cheerio.load(html);
  var rating = $('.a-size-base').html();
  var revies = $('.a-link-emphasis').html();

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
    revies = revies.match(/\d/g);
    if( revies == null ){
      revies = 0;
    }else{
      revies = revies.join("");
    }
  }
  
  var response = {
                  "star": rating,
                  "total_reviews":revies
                };

  return response;
};






