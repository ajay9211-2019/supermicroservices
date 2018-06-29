
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
                    };
  return responseParam;
};

module.exports.getHtmlResponse = ( data='') => {

  let responseParam = {
              headers: {
                        "Access-Control-Allow-Origin" : "*",
                        "Cache-Control":"max-age=3600,private",
                         "content-type": "text/html", // Required for CORS support to work
                      },
                        body: data,
                    };
  return responseParam;

};