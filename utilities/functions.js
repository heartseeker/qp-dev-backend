const fs = require('fs');

const main = {
    readSingleFile: (dirname) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, function(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    },

    readFiles: (dirname, onFileContent, onError) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, function(err, filenames) {
                if (err) {
                    reject(err);
                }
    
                var files = [];
    
                filenames.forEach(function(filename) {
                    files.push(dirname + '/' + filename);
                });
                resolve(files);
            });
        });
    }
}

module.exports = main;