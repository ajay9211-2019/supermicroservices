
var request 		= require('request');
var productExtract  = require('./productExtract');

module.exports.scrapProduct = ( productUrl , region ) => { 

	return new Promise((resolve) => {

		var options = {
				  url: productUrl,
				  headers: {
				  	'Cookie':'session-id=259-9437106-0263146; ubid-acbuk=262-1397940-7420831; lc-acbuk=en_GB; x-acbuk="ESHBTFUpcnP5c489JASge9h@idhRZ2VHKshAxmkM03wYhY7@I?uC@N18wfX4Nv0Q"; at-acbuk=Atza|IwEBIJGu_lf37QFDK7JMVDLkocZYMWv36B8CrIcMED2pNh_R1GOQ9l_G7nryQhTB1s1dfy2EfwkWWr3032OawU64Rcc8A8F0S4qNlapFnhCIK16vKGG4auU0kA6msthbNlq6UNnzA7kv3rjVmX27YwYLV7PL490kQS6sCip62QT2Wgw1fmVQx9v4QGLlk0iUX8yQMACDuhjSkZJEqJmD7IonoLzyspPEi5d3KfXldG-8b3NLuGp6llTBLcPCC0e-gVl243LhWyLRR0lbXhszI1EreYB5E30-4h_g7fSKQF7jO3_TjxClD8OCrGTytF3pDjw5rkUWE5xL2Z9e40z_vn8t5MIVJYogM-LTkdQjVE2OFL96EzHNauTHN-SEUmqp-alMYHVkpOTAdtx7M96_N7-LmsKj; x-wl-uid=14DZns5FMczi2Wvp0Y1dsY1eNEW7sjGEK0ovYfmLDZBFADp+nxF2g9EkjrQAIy2r9ZIWg7bNa1CgNKtw+D334E+vU1Nk4t4brujDmPeP4Tfkvg9rbDE9Lgp97z0Y6HcUkPRkYVZ/vQoA=; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; session-token="FkQK/egsvP4dWbaFKG/KwYbxfKtUHAxjTmqyRpMF2KpItSeCZhtG8MmljxNXoC0CTJBX9/4jfoMfZBbxS5/a+icEBbLu3QevXuvwsq8uNHAAMPHyyZ6aq/L+8nPfsWKV4L4F/yvsnoBsVVFKwesq+NryRW3lj8kQZYMGXuzRbQZc673JMj5GDl+SYlB/p9X/0NOww9CaG1+ZMwBIogGHFvdZ5Gs2kG6vHpRgCBcMRFzYjEM9YKfypHEVGGyjK1n+V9yH+at/v86EKGT7sdXQHQ=="; session-id-time=2082787201l; csm-hit=tb:0NAC54RT7ZAPDJB4EN0P+s-0NAC54RT7ZAPDJB4EN0P|1532091883741&adb:adblk_no',
				  	'Referer'   :'https://www.amazon.'+region,
				  	'User-Agent': this.getRandomUserAgent(),
				  	'Upgrade-Insecure-Requests':1,
				  }
			};
			
		function callback(error, response, body) {
		  if (!error && response.statusCode == 200) {
		    
		    resolve(productExtract.scrapExtractProducts( body ));
		  }else{
		  	resolve( { 'error':true } );
		  }
		}
		 
		request(options, callback);

	});

};


module.exports.getRandomUserAgent = ( ) => {

	var user_agent_list = [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
   		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    	'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    	'Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
	    'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
	    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
	    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
	    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
	    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
	    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
	    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
	    'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
	    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
	    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
	    'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
	    'Mozilla/5.0 (Windows NT 6.2; WOW64; Trident/7.0; rv:11.0) like Gecko',
	    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
	    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
	    'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
	    'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
	    'Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
	    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
	    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
	    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)'
	];

	return user_agent_list[Math.floor(Math.random() * user_agent_list.length)];
};



