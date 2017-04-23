/**
 * Example on how to use inside a web app
 * 
 * 
 * 
var server = http.createServer(function (req, res) {
    res.setHeader('content-type', 'video/mp4');
    var range = req.headers.range;
    streamTorrent(range, (stream, data) => {
        res.writeHead(206, {
            "Content-Range": "bytes " + data.start + "-" + data.end + "/" + data.total,
            "Accept-Ranges": "bytes",
            "Content-Length": data.chunksize,
            "Content-Type": "video/mp4"
        });
        console.log('STREAMING...');
        stream.pipe(res);
    });
});
server.listen(8000, '127.0.0.1');  // start
console.log('Listening on port: 8000');
 *
 */

const torrentStream = require('torrent-stream');
const http = require('http');
const fs = require('fs');
const path = require('path');
const magnetLink = require('magnet-link');
let config;

const TorrentStream = module.exports = function (_config, url, callback) {
    //Set configuration
    config = _config; 
    if (url.indexOf('magnet') < 0) {
        fs.statSync(path.join(__dirname, '../', '/data/', url));
        magnetLink(path.join(__dirname, '../', '/data/', url), function (err, link) {
            if(err){
                throw new Error(err);
            }
            this.magnet = link;
            callback(link);
        }.bind(this));
    } else {
        this.magnet = url;
        callback(url);
    }
};

TorrentStream.prototype.createReadStream = function (range, callback) {
    // Set a default value
    if (!range) {
        range = "bytes=0-";
    }
    console.log('Working on', this.magnet);
    var engine = this.engine = torrentStream(this.magnet);
    engine.on('ready', function () {
        let stream; // we will use only one file :)
        let body;
        let data = {};
        let file;
        let maxLen = 0;
        let ind = 0;
        engine.files.forEach(function (_file, index) {
            if(_file.length > maxLen){
                maxLen = _file.length;
                ind = index;
            }
            console.log('Found :', _file.name);
        });
        file = engine.files[ind];
        console.log('Streaming ...', file.name);
        data.positions = range.replace(/bytes=/, "").split("-");
        data.start = parseInt(data.positions[0], 10);
        data.total = file.length;
        data.end = data.positions[1] ? parseInt(data.positions[1], 10) : data.total - 1;
        data.chunksize = (data.end - data.start) + 1;
        stream = file.createReadStream({
            start: data.start,
            end: data.end
        });
        callback(stream, data);
    });
};