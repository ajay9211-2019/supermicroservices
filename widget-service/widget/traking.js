 
const trialPlanid = 1;
const trakingRegionMapper = {
                                'com'     :'getsuper02-20',
                                'com.br'  :'super-BR',
                                'ca'      :'super-CA',
                                'cn'      :'super-CN',
                                'de'      :'super-DE',
                                'es'      :'super-ES',
                                'fr'      :'getsuperfr-21',
                                'in'      :'getsuperin-21 for india',
                                'it'      :'getsuperit-21',
                                'co.jp'   :'super-JP',
                                'com.mx'  :'super-MX',
                                'co.uk'   :'getsuperuk-21',
                                'com.au'  :'getsuperau-22'
                            };

module.exports.getTrakingId = function( region , userArrTrakingId,userPlanid ){
    // user traking id empty than return default trakingid superservices
    let trakingid = [];
    
    if( typeof userArrTrakingId == 'undefined' || userArrTrakingId[region] == 'undefined' || userArrTrakingId[region] === null  ){
      trakingid['super'] = true; 
      trakingid['id']    =  trakingRegionMapper[region] != "undefined" ? trakingRegionMapper[region] :'undefined';
       return trakingid; 
    }
    if( trialPlanid != userPlanid ){
        trakingid['super'] = false; 
        trakingid['id']    = userArrTrakingId[region];
        return trakingid;
    }

    let number = Math.random();
    // 20% chanches for super
    if(  number <= 0.2 ){
        trakingid['super'] = true; 
        trakingid['id'] = trakingRegionMapper[region];
    }else{
        // 80% chanches for user
        trakingid['super'] = false; 
        trakingid['id']    = userArrTrakingId[region];
    }
    return trakingid;
};

module.exports.getSuperTrakingIds = function( ){
    return trakingRegionMapper;
};

module.exports.getCurrencySymbolByRegion = function( region ){
    
    const symbolByRegionMapper = {
                                "com"    :"&#36;",
                                "com.br" :"&#66114;",
                                "cn"     :"&#165;",
                                "de"     :"&#107114;",
                                "es"     :"&#8364;",
                                "fr"     :"&#677270;",
                                "in"     :"&#8377;",
                                "it"     :"&#66114;",
                                "co.jp"  :"&#165;",
                                "com.mx" :"&#36;",
                                "co.uk"  :"&#163;",
                                'com.au' : "&#36;"
                            };

    return symbolByRegionMapper[region] == 'undefined'? '&#36;':symbolByRegionMapper[region];
};

