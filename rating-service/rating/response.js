
module.exports.getJsonResponse = ( data={},statusCode=200 , Message='OK' ) => {

  let responseParam = {
  						headers: {
                      	"Access-Control-Allow-Origin" : "*",
                         // Required for CORS support to work
                    	},
                        body: JSON.stringify({
                              data: data,
                              message: Message,
                              statusCode: statusCode,
                        }),
                    };
  return responseParam;
};

