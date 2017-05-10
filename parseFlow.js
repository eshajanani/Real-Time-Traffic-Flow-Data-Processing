
var file = 'C:/Users/jeshwaran/Documents/IoTdemo/data/mapdata.json';
var count = 0;
//exports.parseEvent= function(bbox,filename) {
exports.parseEvent = function (bbox, timeInMss) {
    var buffer = JSON.parse(require('fs').readFileSync(file, 'utf8'));

    var parseJSON = JSON.parse(buffer);

    console.log("RWS list");

    var fs = require('fs');

    var jsonfile = require('jsonfile')

    var json = {};
    var obj = {
        table: []
    };

   // var count = 0;
    var ode = null;


    for (i in parseJSON.RWS[0].RW) {

        count = count + 1;
        console.log("count= ", count);
        if (count == 2) {
            break;
        }

        var count1 = 0;
        ode = parseJSON.RWS[0].RW[i].DE;
        for (j in parseJSON.RWS[0].RW[i].FIS) {

            count1 = count1 + 1;
            console.log("count1= ", count1);
            if (count1 == 2) {
                break;
            }
            var ide = null;
            var qdir = null;

            for (m in parseJSON.RWS[0].RW[i].FIS[j].FI) {

                ide = parseJSON.RWS[0].RW[i].FIS[j].FI[m].TMC.DE;

                qdir = parseJSON.RWS[0].RW[i].FIS[j].FI[m].TMC.QD;
                var sp, jf, cn = null;

                for (l in parseJSON.RWS[0].RW[i].FIS[j].FI[m].CF) {


                    sp = parseJSON.RWS[0].RW[i].FIS[j].FI[m].CF[l].SP;
                    cn = parseJSON.RWS[0].RW[i].FIS[j].FI[m].CF[l].CN;
                    jf = parseJSON.RWS[0].RW[i].FIS[j].FI[m].CF[l].JF;
                    su = parseJSON.RWS[0].RW[i].FIS[j].FI[m].CF[l].SU;
                    ff = parseJSON.RWS[0].RW[i].FIS[j].FI[m].CF[l].FF;
                } //END l  - CF

                //  console.log("NE LAT:", bbox.ne_latitude);
                /*    console.log("NE Long:", bbox.ne_longitude);
                    console.log("SW LAT:", bbox.sw_latitude);
                    console.log("SW Long:", bbox.sw_longitude); */
                //  eventHubSend({ outerDE: ode, innerDE: ide, queueDir: qdir, capspeed: sp, jamfactor: jf, congestion: cn, nonCapSpeed: su, freeFlowSpeed: ff });
                //  console.log(" outerDE:" + ode + " innerDE: " + ide + " queueDir: " + qdir + " capspeed:" + sp + " jamfactor:" + jf + " congestion:" + cn + " nonCapSpeed:" + su + " freeFlowSpeed:" + ff);
                var insertFlow = require('./insertDataAzure.js');
                count = count + 1;
                var data = { Id: count, td: timeInMss, ne_latitude: bbox.ne_latitude, ne_longitude: bbox.ne_longitude, sw_latitude: bbox.sw_latitude, sw_longitude: bbox.sw_longitude, outerDE: ode, innerDE: ide, queueDir: qdir, capspeed: sp, jamfactor: jf, congestion: cn, nonCapSpeed: su, freeFlowSpeed: ff };
                //   console.log("Data:", data);

                insertFlow.insertTrafficFlowToDb(data);
              

            } // END m  - FI



        }// end j - FIS





    }// end i RW





}
