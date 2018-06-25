
module.exports.prepareWidgetHtml = ( objWidgetData , trakingid, lastSynctTime,superTraking,userTraking ) => {

var prepareHtml  =  objWidgetData.template;
console.log( lastSynctTime );
lastSynctTime = new Date(lastSynctTime*1000 );

var options = { day: 'numeric',month: 'short',year: 'numeric',hour: 'numeric', minute: 'numeric', hour12: true };
options.timeZoneName = 'short';
lastSynctTime = lastSynctTime.toLocaleString( 'en-US', options );

var objTemplateData = {"products":objWidgetData.data.products,"theme":objWidgetData.data.theme,"trakingid":trakingid['id'],"lastSynctTime":lastSynctTime,"superTrakings":superTraking,"userTrakings":userTraking};

let trakingby    = true == trakingid['super'] ? 'super':'user';
  prepareHtml  += `
                var context = ${JSON.stringify(objTemplateData) };
                var theCompiledHtml    = theTemplate(context);
                $('#frameid2').contents().find('html').html(theCompiledHtml);
                  // Add the compiled html to the page
                $('html').html(theCompiledHtml);
            });
            </script>
            <script> var trakingby ='${trakingby}';</script>
          `;

  return prepareHtml;
};

module.exports.validateRequestData = ( requestData ) => {

  if( requestData.pathParameters == null  ){
    return false;
  }

  var data = {
              "widgetid":parseInt( requestData.pathParameters.id ),
              "userid":parseInt( requestData.pathParameters.userid ),
              "accesstoken":requestData.pathParameters.accesstoken
            };
  
  return data;
};


module.exports.prepareWidgetProducts = ( objProducts , objWidgetProducts ) => {

  let arrProducts = [];
  let arrLastSyncWidgets = [];
  

  let arrPrepareProductByasin = this.prepareProductKeyByAsin(  objProducts );

  objWidgetProducts.forEach( function( objProduct ,index ) {
    
    let arrPrepare = arrPrepareProductByasin[objProduct.asin];
    
    if( typeof arrPrepare !== 'undefined' ) {
      arrPrepare.title = objProduct.title;
      arrPrepare.url = '';
      arrPrepare.url = objProduct.url;
      arrPrepare.reviewsurl = arrPrepare.reviews;
      arrPrepare.reviews    = arrPrepare.totalReviews;
      arrLastSyncWidgets.push( arrPrepare.lastupdatetime );
     
    }else{
      arrPrepare = objProduct;
    }
    arrProducts.push( arrPrepare );
  
    });
    let lastSynctTime = '';
    if( arrLastSyncWidgets.length > 0 ){
      lastSynctTime = arrLastSyncWidgets.sort( (a, b) => a - b );
      lastSynctTime = lastSynctTime[0];
    }
    

  return {'lastSynctTime':lastSynctTime ,'products':arrProducts };
};

module.exports.prepareProductKeyByAsin = ( objProducts ) => {
  
  let arrProducts = {};
  if( typeof objProducts == 'undefined'){
    return [];
  }
  objProducts.forEach( function( objProduct ,index ) {
      let asin = objProduct.asin; 
      arrProducts[asin] = objProduct;
  });

  return arrProducts;
  
}

