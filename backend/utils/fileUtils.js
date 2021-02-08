const fs = require('fs');
const path = require('path');

const read = (filename) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, filename), 'utf8'));
}

const write = (filename, json) => {
    fs.writeFile(filename, JSON.stringify(json, null, 4), err => {
        if (err) throw err;
    });
}

module.exports = {
    read, write
};