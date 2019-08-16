var fs = require('fs');
var path = require('path');
var utils = require('./utils.js');

module.exports = {
    writeFile: function(file, data) {
        var deferred = utils.getDefer();
        file = path.resolve(file);

        fs.writeFile(file, data, 'utf-8', function(err) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(true);
            }
        });
        return deferred.promise;
    },
    readFile: function(file) {
        var deferred = utils.getDefer();
        file = path.resolve(file);

        fs.readFile(file, 'utf-8', function(err, data) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }
};
