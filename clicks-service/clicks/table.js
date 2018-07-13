
const AWS         = require('aws-sdk');
const docClient   = new AWS.DynamoDB.DocumentClient({ region : 'us-east-1' });

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


module.exports.put = ( tableName , jsonData ) => {

	let paramsTable = {
	              TableName: tableName,
	              Item:jsonData,
	          };

	return new Promise((resolve) => {

	   	docClient.put( paramsTable, function(err, data) {
			if( err ){
				resolve(err);
			}else{
				resolve( data );
			}
			 
	    });

    });
};

module.exports.updateClicks = ( tableName , jsonData,clickscount) => {
	
	let paramsTable = {
			              TableName: tableName,
			              Key:jsonData,
			              UpdateExpression: 'set #clicks = :clicks',
			              ExpressionAttributeNames: {'#clicks':'clicks'},
			              ExpressionAttributeValues: {
							    ':clicks' : clickscount
							}
	          		};
	docClient.update( paramsTable, function(err, data) {
		if (err) {
			console.log(err );
		}else{
			console.log("====update-clicks success===");
		return data; 
		}


	});
			
};
