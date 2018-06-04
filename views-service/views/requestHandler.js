// load external files or modules.
var response      = require('./response');
const AWS         = require('aws-sdk');
const docClient   = new AWS.DynamoDB.DocumentClient({ region : 'us-east-2' });

module.exports.getRequestHandler = ( event, context, callback ) => {

	let params = {
                TableName: "users",
                Key:{
                  "userid":parseInt( strShopifyStoreId ),
                   
                }
            };

   
   return callback( null , response.getJsonResponse( {'data':'Hi get request'} ) );
};

module.exports.postRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi post request'} ) );
};

module.exports.putRequestHandler = ( event, context, callback ) => {
   
   return callback( null , response.getJsonResponse( {'data':'Hi put request'} ) );
};