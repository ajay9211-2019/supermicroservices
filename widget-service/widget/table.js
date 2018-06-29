
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
				resolve(false);
			}else{
				resolve(data.Item);
			}
			
		});
	});
};

module.exports.put = ( tableName , jsonData ) => {

	let paramsTable = {
	              TableName: tableName,
	              Item:jsonData,
	          };
	         
   	docClient.put( paramsTable, function(err, data) {
		if (err) {
		   return err;
		}
		return data; 
	});
};

module.exports.getBatchProduct = ( arrJsonAttributes ) => {

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
				console.log( err );
				resolve(false);
			}else{
				resolve(data.Responses);
			}
		
		});

	});
};

module.exports.updateViews = ( tableName , jsonData,JsonViews ) => {

	let paramsTable = {
			            TableName: tableName,
			            Key:jsonData,
			            UpdateExpression: 'set #views = :views',
			            ExpressionAttributeNames: {'#views':'views'},
			            ExpressionAttributeValues: {
							    ':views' : JsonViews
							}
	          		};
	          		
	docClient.update( paramsTable, function(err, data) {
		if (err) {
			return err;
		}else{
			console.log("====update-views===");
		return data; 
		}
	});
};