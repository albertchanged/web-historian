var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {  
    if (err) {
      console.log('Could not read URLs from sites.txt');
    }
    callback(data.split('\n'));
  });
};


exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(siteList) {
    var found = false;
    for (var i = 0; i < siteList.length; i++) {
      if (siteList[i] === url) {
        found = true;
      }
    }
    if (callback) {
      callback(found);      
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function() {
    if (callback) {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile(exports.paths.archivedSites, 'utf-8', function(err, data) {
    if (callback(data.split('\n')).includes(url)) {
      return true;
    }
  });
  return false;
};

exports.downloadUrls = function(urls) {
  // fs.readFile(exports.paths.archivedSites, 'utf-8', function() {
  // var array = [];
  // fs.writeFile('firstText.txt', 'Hello', function(err) {
  //   if (err) {
  //     console.log('Cannot write');
  //   }
  // });
  _.each(urls, function(url) {
    // if (!exports.paths.archivedSites.includes(url)) {
    // console.log('yes');
    // // array.push(url);
    // fs.appendFile(exports.paths.archivedSites, url, function() {
    //   console.log(url);
    // });
    exports.addUrlToList(url);
    // }
  });
  // console.log(array, ' in between loops');
  // for (var i = 0; i < array.length; i++) {
  //   console.log(array, ' in for loop');
  //   fs.appendFile(exports.paths.archivedSites, array[i], function() {
  //     console.log(array[i]);
  //   });
  // }
  // console.log(array, ' outside each');
  // });
  exports.readListOfUrls(function(urlList) {
    _.each(urlList, function(url) {
      http.get(url, function(response) {
        // Do nothing
      }).on('error', function(error) {
        // Add siteList[i] to the urlList 
        exports.addUrlToList(url);
      });
    });
  });
};
