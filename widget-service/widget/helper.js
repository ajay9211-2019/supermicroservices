
module.exports.prepareHtml = ( productData , objWidgetData ) => {

var prepareHtml  =  objWidgetData.template;
 // return productData;
  prepareHtml  += `<script type="text/javascript">
             var context = ${ JSON.stringify( {"products":productData.sproducts} ) };
           var html    = template(context);
           document.getElementById("row").innerHTML = html;
         </script>`;

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

