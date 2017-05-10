var https = require("https");
var fs = require("fs");
var file = 'C:/Users/jeshwaran/Documents/IoTdemo/data1/mapdata/replace.json'
var file = 'C:/Users/jeshwaran/Documents/IoTdemo/data/mapdata.json'
//exports.requestData = function (url, callback) {
    exports.requestData = function (url) {
    /*
    console.log("Going to delete an existing file");
    fs.unlink(file, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File deleted successfully!");
    });
    */
  /*  var date = new Date();
    var new_file=file.replace("replace", date);*/
    var request = https.get(url, function (response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event    
        var buffer = "",
            data,
            route;

        response.on("data", function (chunk) {
            buffer += chunk;

        });  // end response.on "data"

        response.on("end", function (err) {

         
            var jsonfile = require('jsonfile')
           
            jsonfile.writeFile(file, buffer, { spaces: 2 }, function (err) {
                console.error(err)
            }); // end writefile

        } ); // end response.on "end"

    });
  //  callback(new_file);
} // end function


