
module.exports.getJsonResponse = ( data={},statusCode=200 , Message='OK' ) => {

  let responseParam = {
  						headers: {
                      	"Access-Control-Allow-Origin" : "*"

                      },
                        body: JSON.stringify({
                              data: data,
                              message: Message,
                              statusCode: statusCode,
                        }),
                        statusCode: 200
                    };
  return responseParam;
};

module.exports.getHtmlResponse = ( data='') => {

  let responseParam = {
              headers: {
                         "Access-Control-Allow-Origin" : "*",
                         // "Cache-Control":"max-age=3600,private,must-revalidate",
                         "content-type": "text/html", // Required for CORS support to work
                         // "Content-Encoding":"compress,gzip"
                         "X-Content-Type-Options":"nosniff"
                      },
                        body: data,
                        statusCode: 200
                    };
  return responseParam;

};