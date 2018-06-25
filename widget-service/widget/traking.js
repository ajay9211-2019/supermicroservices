 
 const trialPlanid = 1;
 const chancesProb = 25;

 const trakingRegionMapper = {
                                'com'     :'super-US',
                                'com.br'  :'super-BR',
                                'ca'      :'super-CA',
                                'cn'      :'super-CN',
                                'de'      :'super-DE',
                                'es'      :'super-ES',
                                'fr'      :'super-FR',
                                'in'      :'super-IN',
                                'it'      :'super-IT',
                                'co.jp'   :'super-JP',
                                'com.mx'  :'super-MX',
                                'co.uk'   :'super-UK',
                                'com.au'  :'super-AU'
                            };

module.exports.getTrakingId = function( region , userArrTrakingId,userPlanid ){
    // user traking id empty than return default trakingid superservices
     let trakingid = [];

    if( typeof userArrTrakingId == 'undefined' || userArrTrakingId[region] == 'undefined' ){
      trakingid['super'] = true; 
      trakingid['id']    =  trakingRegionMapper[region] != "undefined" ? trakingRegionMapper[region] :'undefined';
       return trakingid; 
    }
    if( trialPlanid != userPlanid ){
        trakingid['super'] = false; 
        trakingid['id'] = userArrTrakingId[region] != "undefined" ? userArrTrakingId[region] :'undefined';
        return trakingid;
    }

   let number = Math.random();
    // 20% chanches for super
    if( number < 0.7 ){
        trakingid['super'] = true; 
        trakingid['id'] = trakingRegionMapper[region];
       
    }else{
         // 75% chanches for user
        trakingid['super'] = false; 
        trakingid['id']    = userArrTrakingId[region];
    }

    return trakingid;
};


module.exports.getSuperTrakingIds = function( ){
    return trakingRegionMapper;
};
