'use strict';
var fs = require('fs'),
    path = require('path');

// recursively walk modules path and callback for each file
var walk = function(modulesPath, excludeDir, callback) {
    fs.readdirSync(modulesPath).forEach(function(file) {
        var newPath = path.join(modulesPath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
            callback(newPath);
        } else if (stat.isDirectory() && file !== excludeDir) {
            walk(newPath, excludeDir, callback);
        }
    });
};

exports.walk = walk;

// recursively walk modules path and callback for each directory
var walkDirectories = function(modulesPath, excludeDirectory, callback) {
    fs.readdirSync(modulesPath).forEach(function(fileOrDirectory) {
        var newPath = path.join(modulesPath, fileOrDirectory);
        var stat = fs.statSync(newPath);
        if (stat.isDirectory() && fileOrDirectory !== excludeDirectory) {
            callback(fileOrDirectory);
        }
    });
};

exports.walkDirectories = walkDirectories;