

var express = require('express');
var app = express();
var current = "";
app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
})

app.get('/process_get', function (req, res) {
     response = req.query.country
    
    console.log(response);
    //res.end(JSON.stringify(response));
    var timeInMss = Date.now().toString();
    console.log("timeInMss", timeInMss);
    current = timeInMss;


    console.log("Current time:", current);
   
   var getData = require('./getData.js');
   getData.getTrafficFlow(response, timeInMss);
  
})


app.get('/report.htm', function (req, res) {

    //res.end(JSON.stringify(response));
  

})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})