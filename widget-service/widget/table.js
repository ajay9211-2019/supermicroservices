
const AWS         = require('aws-sdk');
const docClient   = new AWS.DynamoDB.DocumentClient({ region : 'us-east-2' });

module.exports.get = ( tableName , jsonWhereCondition ) => {

	return new Promise((resolve) => {

		let paramsTable = {
          	TableName: tableName,
          	Key:jsonWhereCondition,
      	};
   	
		docClient.get( paramsTable, function(err, data) {
			if( err ){
				resolve(err);
			}else{
				resolve(data.Item);
			}
			
		});
		        
	});

 };


module.exports.put = ( tableName , jsonWhereCondition ) => {

	let paramsTable = {
	              TableName: tableName,
	              Item:jsonData,
	          };

   	docClient.put( params, function(err, data) {
		if (err) {
		   return callback(null, err );
		}
		return callback(null, data ); 
		 
    });
};


module.exports.batchProductGet = ( arrJsonAttributes ) => {

	var paramsTable = {
			  RequestItems: {
			    "sproducts": {
			      Keys: arrJsonAttributes
			    }
			  }
			};

	return new Promise((resolve) => {
		docClient.batchGet( paramsTable, function(err, data) {
			if( err ){
				resolve(err);
			}else{
				resolve(data.Responses);
			}
		
		});

	});
};