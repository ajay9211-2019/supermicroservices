
module.exports.prepareWidgetHtml = ( objWidgetData , trakingid) => {

var prepareHtml  =  objWidgetData.template;
 //return objWidgetData;
  prepareHtml  += `
                var context = ${JSON.stringify( {"products":objWidgetData.data.products,"theme":objWidgetData.data.theme,"trakingid":trakingid} ) };
                var theCompiledHtml    = theTemplate(context);
                $('#frameid2').contents().find('#previewarea').html(theCompiledHtml);
                  // Add the compiled html to the page
                $('#previewarea').html(theCompiledHtml);
            });
            </script>
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

