
const request        = require('axios');
var ratingExtract    = require('./ratingExtract');

module.exports.prepareRating = ( productUrl , region) => { 

	return new Promise((resolve) => {

		request( productUrl ).then( ( { data } ) => {
			  
	        resolve( ratingExtract.extractRatings( data , region ) );
	    }).catch(function (error) {
	    	resolve({ 'error':true });
	    });

	});

};