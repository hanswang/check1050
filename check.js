var querystring = require('querystring');
var http = require('https');

var data = querystring.stringify({
    'latitude': <XXX>
    'longitude': <YYY>
});

var options = {
    host: '1050.rfs.nsw.gov.au',
    port: 443,
    path: '/rfs1050/IsIn1050',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'http://www.rfs.nsw.gov.au/plan-and-prepare/1050-vegetation-clearing/tool',
        'Content-Length': data.length,
        'Origin': 'http://www.rfs.nsw.gov.au'
    }
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        var list = JSON.parse(chunk);
        console.log(list);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(data);
req.end();
