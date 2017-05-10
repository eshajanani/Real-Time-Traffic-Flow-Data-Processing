'use strict';

var fs = require('fs');
var adal = require('adal-node');
var jsonfile = require('jsonfile');

var AuthenticationContext = adal.AuthenticationContext;

function turnOnLogging() {
    var log = adal.Logging;
    log.setLoggingOptions(
        {
            level: log.LOGGING_LEVEL.VERBOSE,
            log: function (level, message, error) {
                console.log(message);
                if (error) {
                    console.log(error);
                }
            }
        });
}

/*
 * You can override the default account information by providing a JSON file
 * with the same parameters as the sampleParameters variable below.  Either
 * through a command line argument, 'node sample.js parameters.json', or
 * specifying in an environment variable.
 * {
 *    "tenant" : "rrandallaad1.onmicrosoft.com",
 *    "authorityHostUrl" : "https://login.windows.net",
 *    "clientId" : "624ac9bd-4c1c-4687-aec8-b56a8991cfb3",
 *    "clientSecret" : "verySecret=""
 * }
 */
var parametersFile = process.argv[2] || process.env['ADAL_SAMPLE_PARAMETERS_FILE'];

var sampleParameters;
if (parametersFile) {
    var jsonFile = fs.readFileSync(parametersFile);
    if (jsonFile) {
        sampleParameters = JSON.parse(jsonFile);
    } else {
        console.log('File not found, falling back to defaults: ' + parametersFile);
    }
}

if (!parametersFile) {
    sampleParameters = {
        tenant: 'dunnsolutionsgroup365.onmicrosoft.com',
        authorityHostUrl: 'https://login.windows.net',
        clientId: 'eadf9102-12ef-4abc-af50-935c013cd53e',
        clientSecret: '0He8T8EIWTF45spdZ2/1YA+YXQAEHGtRJrXUaPb9tg0='
    };
}

var authorityUrl = sampleParameters.authorityHostUrl + '/' + sampleParameters.tenant;

var resource = '00000009-0000-0000-c000-000000000000';

turnOnLogging();

var context = new AuthenticationContext(authorityUrl);


exports.getToken = function (bbox, timeInMss) {
    var accessToken = "";

    context.acquireTokenWithClientCredentials(resource, sampleParameters.clientId, sampleParameters.clientSecret, function (err, tokenResponse) {
        if (err) {
            console.log('well that didn\'t work: ' + err.stack);
        } else {

            // var AccesToken = JSON.stringify(tokenResponse);
            console.log("Hello world :", tokenResponse.accessToken);

            accessToken = tokenResponse.accessToken;

            fs.writeFile('C:/Users/jeshwaran/Documents/IoTdemo/data/accessToken.txt', accessToken);

          
          
        }
    });
  
}