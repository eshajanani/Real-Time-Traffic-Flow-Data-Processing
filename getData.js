


var parsedDatafile = 'C:/Users/jeshwaran/Documents/IoTdemo/data/parsedData.json'
var parsedDatafile1 = 'C:/Users/jeshwaran/Documents/IoTdemo/data/parsedData1.json'
var jsonfile = require('jsonfile');
//parseEvent();









exports.getTrafficFlow = function (data, timeInMss)
{
    console.log("BBOX:", data);
    var bbox = JSON.parse(data);
    console.log("NE LAT:", bbox.ne_latitude);
    console.log("NE Long:", bbox.ne_longitude);
    console.log("SW LAT:", bbox.sw_latitude);
    console.log("SW Long:", bbox.sw_longitude);
  
    var url_without_bbox = "https://traffic.cit.api.here.com/traffic/6.1/flow.json?bbox=ne_latitude%2Cne_longitude%3Bsw_latitude%2Csw_longitude&app_id=UgV2Nv9G2zYPqfpQqEqa&app_code=QIFCtPCPuu7xI2xGs4CuDw";

    var url = url_without_bbox.replace("ne_latitude", bbox.ne_latitude);
    url = url.replace("ne_longitude", bbox.ne_longitude);
    url = url.replace("sw_latitude", bbox.sw_latitude);
    url = url.replace("sw_longitude", bbox.sw_longitude);
    console.log("Final url: ", url);
 /*   var hereTraffic = require('./hereTrafficFlow.js');
    hereTraffic.requestData(url, function (filename){
        var parseTrafficFlow = require('./parseFlow.js');
    parseTrafficFlow.parseEvent(bbox,filename); 
    });   */

    var hereTraffic = require('./hereTrafficFlow.js');
    hereTraffic.requestData(url);
    var parseTrafficFlow = require('./parseFlow.js');
    parseTrafficFlow.parseEvent(bbox, timeInMss);
   setTimeout(function () {
       console.log('timeout completed');
      var powerBiReport = require('./powerBIReport.js');
       powerBiReport.appendReport(bbox, timeInMss);
       

     /*  var getAccessToken = require('./getAccessToken.js');
       var accessToken = getAccessToken.getToken(bbox, timeInMss); */

    }, 20000); 

}

