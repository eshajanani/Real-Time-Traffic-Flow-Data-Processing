var Connection = require('tedious').Connection;
var Request = require('tedious').Request;


// Create connection to database
var config = {
    userName: 'esha', // update me
    password: 'Loga@1989', // update me
    server: 'eshatrafficdata.database.windows.net', // update me
    options: {
        encrypt: true,
        database: 'eshatrafficdata' //update me
    }
}




exports.insertTrafficFlowToDb = function (data) {
    var connection = new Connection(config);

  console.log("DATA:", data.ne_latitude);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        }
        else {
            insertIntoDatabase(data)
        }
    });



    function insertIntoDatabase(data) {

      //  console.log("Inserting a brand new product into database...");
        var query = "INSERT INTO trafficFlow (datetime1,ne_latitude, ne_longitude, sw_latitude, sw_longitude,outerDE,innerDE,queueDir,capspeed,jamfactor,congestion,nonCapSpeed,freeFlowSpeed) VALUES (" + data.td + "," + data.ne_latitude + "," + data.ne_longitude + "," + data.sw_latitude + "," + data.sw_longitude + ",'" + data.outerDE + "','" + data.innerDE + "','" + data.queueDir + "'," + data.capspeed + "," + data.jamfactor + "," + data.congestion + "," + data.nonCapSpeed + "," + data.freeFlowSpeed + ")";
        console.log("Query : ", query);
        request = new Request(query, function (err, rowCount, rows) {
            if (err) {
                console.log("ERROR : ", err);
            }
            else {
                console.log(rowCount + ' row(s) inserted');
            }
        });
        connection.execSql(request);
    }
}