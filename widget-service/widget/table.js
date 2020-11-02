
const AWS         = require('aws-sdk');
const docClient   = new AWS.DynamoDB.DocumentClient({ region : 'us-east-1' });

module.exports.get = ( tableName , jsonWhereCondition ) => {

	return new Promise((resolve) => {

		let paramsTable = {
          	TableName: tableName,
          	Key:jsonWhereCondition,
          	ConsistentRead:true,
          	ReturnConsumedCapacity:"TOTAL"
      	};
   	
		docClient.get( paramsTable, function(err, data) {
			if( err ){
				resolve(false);
			}else{
				// console.log( data );
				resolve(data.Item);
			}
			
		});
	});
};

module.exports.put = ( tableName , jsonData ) => {

	let paramsTable = {
	              TableName: tableName,
	              Item:jsonData,
	              // ReturnValues: "ALL_NEW",
	              ReturnConsumedCapacity:"TOTAL"
	          };
	       
   	docClient.put( paramsTable, function(err, data) {
		if (err) {
		   
		}
		// console.log( data );
		return data; 
	});
};

module.exports.getBatchProduct = ( arrJsonAttributes ) => {

	var paramsTable = {
			  RequestItems: {
			  	"sproducts": {
			      Keys: arrJsonAttributes,
			      
			    }
			  },
			  ReturnConsumedCapacity:"TOTAL",
			  ConsistentRead : true,
			};

	return new Promise((resolve) => {
		docClient.batchGet( paramsTable, function(err, data) {
			if( err ){
				console.log( err );
				resolve(false);
			}else{
				// console.log( data );
				resolve(data.Responses);
			}
		
		});

	});
};

module.exports.updateViews = ( tableName , jsonData ,jsonViews ) => {
	
	let paramsTable = {
			            TableName: tableName,
			            Key:jsonData,
			            UpdateExpression: 'set #views = :views',
			            ExpressionAttributeNames: {'#views':'views'},
			            ExpressionAttributeValues: {
							    ':views' : jsonViews
							},
						// ReturnValues: "ALL_NEW",
						ReturnConsumedCapacity:"TOTAL"
	          		};
	          		
	docClient.update( paramsTable, function(err, data) {
		if (err) {
			return err;
		}else{
			console.log("====update-views===");
			// console.log( data );
		return data; 
		}
	});
};