const fs = require('fs');
const path = require('path');

const read = (filename) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, filename), 'utf8'));
}

const write = (filename, json) => {
    fs.writeFileSync(filename, JSON.stringify(json, null, 4));
}

const checkExistsWithTimeout = (filePath, timeout) => {
    return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(path.resolve(__dirname, filePath), fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        var dir = path.dirname(path.resolve(__dirname, filePath));
        var basename = path.basename(path.resolve(__dirname, filePath));
        var watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}

module.exports = {
    read, write, checkExistsWithTimeout
};