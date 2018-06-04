
const AWS         = require('aws-sdk');
const docClient   = new AWS.DynamoDB.DocumentClient({ region : 'us-east-2' });

module.exports.get = ( tableName , jsonWhereCondition ) => {

	let paramsTable = {
	              TableName: tableName,
	              Key:jsonWhereCondition,
	          };
   
   docClient.get( paramsTable ,  function( err , data ) {
   	if( err ){
   		return err;
   	}
   	console.log( data );
   	return data;

   });
};


module.exports.put = ( tableName , jsonWhereCondition ) => {

	let paramsTable = {
	              TableName: tableName,
	              Item:jsonData,
	          };

   	docClient.put( params, function(err, data) {
		  if (err) {
		     return err;
		  }

		  return data;
    });
};