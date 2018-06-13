'use strict';

module.exports.omwidget = (event, context, callback) => {
  
  if( event.queryStringParameters == null || typeof event.queryStringParameters.url == 'undefined' || event.queryStringParameters.url == ''){
            
      const response = {
                      statusCode: 200,
                      body: JSON.stringify( { 'statusCode': 400 , 'message':"url error"
                        
                      } ),
                    };

      callback(null, response);
            
  }


  var data  =   {
                  "title":"Spreadr Super-services",
                  "version": "1.0",
                  "type": "rich",
                  "url": event.queryStringParameters.url,
                  "author_name": "Spreadr",
                  "html"   : "<iframe src=\""+event.queryStringParameters.url+"\" style=\"top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;\">"
                };

const response = {
                    statusCode: 200,
                    body: JSON.stringify( data ),
                };
  

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
