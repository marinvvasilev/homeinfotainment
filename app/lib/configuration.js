const fs = require('fs');
const path = require('path');

module.exports = function () {
    let config;
    try {
        fs.statSync(path.join(__dirname, '../', '/config/local.js'));
        config = require('../config/local');
    } catch (error) {
        config = require('../config/default');
    }
    return config;
}