
module.exports.prepareHtml = ( productData , objWidgetData ) => {

var prepareHtml  =  objWidgetData.template;
 //return objWidgetData;

  prepareHtml  += `
                var context = ${ JSON.stringify( {"products":objWidgetData.data.products} ) };
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

  if( false == requestData.pathParameters ){
    return false;
  }

  var data = {
              "widgetid":parseInt( requestData.pathParameters.id ),
              "userid":parseInt( requestData.pathParameters.userid ),
              //"region":requestData.pathParameters.region.toString()
            };
  return data;


};

