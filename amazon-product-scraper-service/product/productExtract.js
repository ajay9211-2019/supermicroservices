
const cheerio  = require('cheerio');

module.exports.scrapExtractProducts = ( html , region) => {
  console.log( "exe......" );
  try {
      // console.log( html );
      const $               = cheerio.load(html);
      let price             = $("#actualPriceValue").text();
      let comparePrice      = $('#price .a-text-strike').text();
      let availability      = $('#availability').text();
       availability         = availability.trim();
      let availabilityText  = availability;
      let capcha            = $(".a-last").text();
      let productPage       = $("#g a img").attr("alt");
      
      if( capcha.search("you're not a robot") >= 0 ){
            return {
                "error":"getting exception."
              }; 
      }
      if( typeof productPage != "undefined" && productPage.search("Sorry! We couldn't find that page") >= 0 ){
          
          return { 
                    "product":{
                              "price":"0.00",
                              "compare_price":"0.00",
                              "availability":0,
                              "availability_text":"discontinue"
                             
                              },
                  };
      }
      
      if( price == "" || price === undefined ){
          
          price = $('#price #priceblock_ourprice').text();
        
        if( price == "" || price === undefined ){
          price = $("#cerberus-data-metrics").attr("data-asin-price");

        }
        if( price === undefined || price == "" ){
         price = $(".deal-price").text();
        }
        if( price == "" || price === undefined ){
          price = $("#toggleBuyBox .a-color-price").text();
        }
        if( price == "" || price === undefined ){
          price = $(".a-color-price").text();
        }
        if( price == "" || price === undefined ){
          price = $("#price_inside_buybox").text();
        }
        if( price == "" || price === undefined ){
          price = $("#priceblock_dealprice").text();
        }

        if( price == "" || price === undefined ){
          price = $(".offer-price").text();
        }
        
      }

      if( comparePrice == "" || comparePrice === undefined ){
        comparePrice = "0";
      }
      if( price == "" || price === undefined ){
        price = "0";
      }
      
      price        =  price.trim().replace(/[^0-9.]*/g, '');
      comparePrice =  comparePrice.trim().replace(/[^0-9.]*/g, '');
      
      price         = price != "" ? parseFloat(price).toFixed(2) : "0";
      comparePrice  = comparePrice != "" ? parseFloat(comparePrice).toFixed(2) :"0";
      
      if( price != '0' && price != "NaN" && price != "0.00" ){
        availability = 1;
      }else{
        
        if( availabilityText.toLowerCase().search("available from") >= 0 ){
          availability = 1;
        }else{
          availability = 0;
        }

      }
      
      if( availabilityText.search("Currently unavailable") >= 0 ){
        availability = 0;
        price        ="0.00";
      }
      // if( price == '0.00'){
      //   console.log( html );
      // }
      let response = {
                      "product":{
                              "price":price,
                              "compare_price":comparePrice,
                              "availability":availability,
                              "availability_text":availabilityText,
                              // "text":capcha
                              }
                    };

      return response;

  } catch( err ){
    
      var response = {
                "error":"getting exception."
              };

    return response;
  }

};






