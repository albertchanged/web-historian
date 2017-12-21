var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    fs.readFile(__dirname + '/public/index.html', function(err, data) {
      if (err) {
        console.log('Cannot get index.html');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  }
  if (req.method === 'POST') {
    
  }
  // res.end(archive.paths.list);
};
