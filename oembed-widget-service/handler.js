'use strict';
var url = require('url');

module.exports.oembedWidget = (event, context, callback) => {
  
  if( event.queryStringParameters == null || typeof event.queryStringParameters.url == 'undefined' || event.queryStringParameters.url == ''){
            
      const response = {
                      statusCode: 200,
                      body: JSON.stringify( { 'statusCode': 400 , 'message':"url error"
                        
                      } ),
                    };

    callback(null, response);
            
  }
  var data = url.parse(event.queryStringParameters.url, true);
  data = data.path.split('/');
  var data  =   {
                  "title":"Super-services",
                  "version": "1.0",
                  "type": "rich",
                  "url": event.queryStringParameters.url,
                  "author_name": "Spreadr",
                  "html"   : "<iframe id=\"super"+data[2]+"\" src=\""+event.queryStringParameters.url+"\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"no\" style=\"overflow: hidden; width: 100%;\" frameborder=\"0\" ></iframe><script src=\"https://files.getsuper.co/super.js\" async></script>"
                };
// <script src=\"https://files.getsuper.co/super.js\" async></script>
  const response = {
                    statusCode: 200,
                    body: JSON.stringify(  data ),
                };
  

return callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
