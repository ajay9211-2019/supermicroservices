 
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
    
    if( userArrTrakingId[region] == 'undefined' ){
      return trakingRegionMapper[region] != "undefined" ? trakingRegionMapper[region] :'undefined';
    }
    if( trialPlanid != userPlanid ){
       return userArrTrakingId[region] != "undefined" ? userArrTrakingId[region] :'undefined';
    }

    let trakingid = '';
    let number = Math.random() * 100;
    
    if( number <= chancesProb ){
        trakingid = trakingRegionMapper[region];
    }else{
        trakingid = userArrTrakingId[region];
    }

    return trakingid;
};
