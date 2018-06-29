
module.exports.prepareWidgetHtml = ( objWidgetData , trakingid, lastSynctTime,superTraking,userTraking,regionCurrencyCode,isgeolocalize='0' ) => {

let options           = { day: 'numeric',month: 'short',year: 'numeric',hour: 'numeric', minute: 'numeric', hour12: true };
options.timeZoneName  = 'short';
lastSynctTime         = new Date(lastSynctTime*1000 );
lastSynctTime         = lastSynctTime.toLocaleString( 'en-US', options );
objWidgetData.data.theme["lastSynctTime"] = lastSynctTime;
objWidgetData.data.theme["currencyCode"]  = regionCurrencyCode;

let objTemplateData = {"products":objWidgetData.data.products,"theme":objWidgetData.data.theme,"trakingid":trakingid['id'],"superTrakings":superTraking,"userTrakings":userTraking};
let trakingby       = true == trakingid['super'] ? 'super':'user';
let prepareHtml     =  objWidgetData.template;

prepareHtml     += `
                  var trakingby     ='${trakingby}';
                  var isgeolocalize ='${isgeolocalize}';
                  var trakingid     = '${trakingid['id']}';

                  setTimeout(function() {  
                   iframe_resize(widgetstyledata);

                  }, 2000);
        

                function iframe_resize(widgetstyledata){
                  
                   var height =  $("#maincontainer").height();
                            
                    
                    widgetstyledata["height"] = height+"px";
                    var msg = JSON.stringify(widgetstyledata);
                   
                    if (parent.postMessage) {
                        parent.postMessage(msg, "*");
                    }
                }

                $(document).on("click",".superclick", function(){
                         
                         var region = $(this).data("region");
                         var asin = $(this).data("asin");
                         var link = "https://www.amazon."+region+"/dp/"+asin;

                         var title = $(this).data("title");
                      
                      if(isgeolocalize == 1){
                            
                            var country_code = $("#iptolocation").val();
                              if(trakingby == 'super'){
                                localize(region,country_code,title,'superTrakings',link);
                              } else {
                                localize(region,country_code,title,'userTrakings',link);
                              }
                      } else {
                        link = link+"?tag="+trakingid;
                          window.open(link, '_blank');
                      }
                      
                      let clickdata = {
                                      "userid" :widgetdata.userid,
                                      "widgetid":widgetdata.widgetid,
                                      "accesstoken":widgetdata.accesstoken,
                                      "asin":asin,
                                      "trackingby":trakingby
                                      };

                                console.log("clickdata",clickdata);

                            $.ajax({
                                url:"https://widgetstaging.getsuper.co/clicks",
                                contentType: 'application/json',
                                method:"POST",
                                dataType : "json",
                                data:JSON.stringify(clickdata),
                                success:function( reponse  ){
                                      
                                }
                            });
              });

            function findlocation_custom()
             {     
                $.ajax({
                      url: "https://extreme-ip-lookup.com/json/",
                      "content-type": "application/json; charset=utf-8",
                      type: "GET",
                    }).done(function(location) {
                        console.log(location);
                      var location = location.countryCode.toLowerCase();

                      $("#maincontainer").append('<input type="hidden" id="iptolocation" value="'+location+'">');
                      console.log(location);
                    });
             }
            
            function localize(region,country_code,title,trankingby,link){
              
              switch(country_code) {
                        case "us":
                            if(region != "com")
                            {
                              var tag = context[trankingby]['com'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['com'];
                              }

                              link = "http://amazon.com/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        case "ca":         
                            if(region != "ca")
                            { 
                              var tag = context[trankingby]['ca'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['ca'];
                              }


                              link = "http://amazon.ca/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        case "gb":         
                            if(region != "co.uk")
                            {
                              var tag = context[trankingby]['co.uk'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['co.uk'];
                              }

                              link = "http://amazon.co.uk/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        case "in":         
                            if(region != "in")
                            {
                              var tag = context[trankingby]['in'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['in'];
                              }
                              link = "http://amazon.in/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        case "de":         
                            if(region != "de")
                            {
                              var tag = context[trankingby]['de'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['de'];
                              }

                              link = "http://amazon.de/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        case "fr":         
                            if(region != "fr")
                            {
                              var tag = context[trankingby]['fr'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['fr'];
                              }

                              console.log(tag);
                              link = "http://amazon.fr/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                         case "es":         
                            if(region != "es")
                            {

                              var tag = context[trankingby]['es'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['es'];
                              }


                              link = "http://amazon.es/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        case "it":            
                            if(region != "it")
                            { 

                              var tag = context[trankingby]['it'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['it'];
                              }


                              link = "http://amazon.it/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                         case "mx":            
                            if(region != "com.mx")
                            { 

                              var tag = context[trankingby]['mx'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['mx'];
                              }


                              link = "http://amazon.com.mx/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                          case "au":            
                            if(region != "com.au")
                            {
                              var tag = context[trankingby]['com.au'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['com.au'];
                              }


                              link = "http://amazon.com.au/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                          case "br":            
                            if(region != "com.br")
                            { 
                              var tag = context[trankingby]['com.br'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['com.br'];
                              }


                              link = "http://amazon.com.br/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                          case "jp":            
                            if(region != "co.jp")
                            { 

                              var tag = context[trankingby]['co.jp'];
                              if(tag==undefined){
                                  var tag = context.superTrakings['co.jp'];
                              }


                              link = "http://amazon.co.jp/s/?field-keywords=" + encodeURIComponent(title) + "&tag="+tag;
                            }
                            break;
                        default:
                            break;
                        } 
                 window.open(link, '_blank');

              }
           
              var context = ${JSON.stringify(objTemplateData) };
                    var theCompiledHtml    = theTemplate(context);
                // Add the compiled html to the page
                    $('html').html(theCompiledHtml);
               });
              </script>
              
              <script> 
                
                if( top !== self ) { 
                  console.log( "iframe loaded" );

                }else{
                  $(document).ready(function() {
                    
                    var theme   = ${JSON.stringify( objTemplateData.theme.container ) };
                    var elementIdSuper = document.getElementById(theme.id);
                    elementIdSuper.style     = theme.styles;
                    elementIdSuper.className +=' '+ theme.class;
                  });
                }
            `;


  return prepareHtml;
};

module.exports.validateRequestData = ( requestData ) => {

  return    {
              "widgetid":parseInt( requestData.pathParameters.id ),
              "userid":parseInt( requestData.pathParameters.userid ),
              "accesstoken":requestData.pathParameters.accesstoken
            };
  };

module.exports.prepareWidgetProducts = ( objProducts , objWidgetProducts ) => {

  let arrProducts             = [];
  let arrLastSyncWidgets      = [];
  let arrPrepareProductByasin = this.prepareProductKeyByAsin(  objProducts );

  objWidgetProducts.forEach( function( objProduct ,index ) {
    
    let arrPrepare = arrPrepareProductByasin[objProduct.asin];
    
    if( typeof arrPrepare !== 'undefined' ) {
      arrPrepare.title        = objProduct.title;
      arrPrepare.url          = objProduct.url;
      arrLastSyncWidgets.push( arrPrepare.lastupdatetime );
     
    }else{
      arrPrepare = objProduct;
    }
    arrProducts.push( arrPrepare );
  
    });
    let lastSynctTime = '';
    if( arrLastSyncWidgets.length > 0 ){
      lastSynctTime = arrLastSyncWidgets.sort( (a, b) => a - b );
      lastSynctTime = lastSynctTime[0];
    }
    

  return {'lastSynctTime':lastSynctTime ,'products':arrProducts };
};

module.exports.prepareProductKeyByAsin = ( objProducts ) => {
  
  let arrProducts = {};
  if( typeof objProducts == 'undefined'){
    return[];
  }
  objProducts.forEach( function( objProduct ,index ) {
      let asin = objProduct.asin; 
      arrProducts[asin] = objProduct;
  });

  return arrProducts;
}

