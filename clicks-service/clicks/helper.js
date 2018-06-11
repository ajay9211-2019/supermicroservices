
module.exports.validateRequestData = ( requestData ) => {

  requestData = JSON.parse( requestData.body );
  
  if( typeof requestData.userid == 'undefined' || typeof requestData.accesstoken == 'undefined' || typeof requestData.widgetid == 'undefined' || typeof requestData.asin ==  'undefined'  ){
    return false;
  }
  
  var data = {
              "widgetid":parseInt( requestData.widgetid ),
              "userid":parseInt( requestData.userid ),
              "accesstoken":requestData.accesstoken,
              "asin":requestData.asin
            };
  return requestData;
};

