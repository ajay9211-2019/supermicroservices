
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

module.exports.getHtmlResponse = ( data='') => {

  let responseParam = {
              headers: {
                        "Access-Control-Allow-Origin" : "*",
                         "content-type": "text/html", // Required for CORS support to work
                      },
                        body: data,
                    };
  return responseParam;

};