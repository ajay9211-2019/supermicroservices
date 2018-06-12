const cheerio  = require('cheerio');
const moment   = require('moment');

module.exports.extractRatings = ( html , region) => {
  
 const $    = cheerio.load(html);
  var rating = $('.a-size-base').html();
  var revies = $('.a-link-emphasis').html();
  
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






