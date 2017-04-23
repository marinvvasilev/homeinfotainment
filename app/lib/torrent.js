const torrentStream = require('torrent-stream');
const http = require('http');

const TorrentStream = function (magnetUri) {
    this.magnet = magnetUri;
};

TorrentStream.createReadStream = function (callback) {
    // Set a default value
    if(typeof range === "undefined"){
        range = "bytes=0-";
    }
    var engine = this.engine = torrentStream(this.magnet);
    engine.on('ready', function () {
        let stream; // we will use only one file :)
        let body;
        let data = {};
        let file = engine.files[0];
        data.positions = range.replace(/bytes=/, "").split("-");
        data.start = parseInt(data.positions[0], 10);
        data.total = file.length;
        data.end = data.positions[1] ? parseInt(data.positions[1], 10) : data.total - 1;
        data.chunksize = (data.end - data.start) + 1;
        stream = file.createReadStream({
            start: data.start,
            end: data.end
        });
        // engine.files.forEach(function (file) {
        //     console.log('filename:', file.name);
        //     stream = file.createReadStream();
        //     // stream is readable stream to containing the file content
        // });
        callback(stream, data);
    });
};

/**
 * Example on how to use inside a web app
 */
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


// function streamTorrent(range, callback) {
//     console.log(range);
//     // Set a default value
//     if(typeof range === "undefined"){
//         range = "bytes=0-";
//     }
//     var engine = torrentStream('magnet:?xt=urn:btih:bf431c10c48689da68976098c5d76e8a39f4dd6a&dn=Prison.Break.S05E02.HDTV.x264-KILLERS.mkv');
//     engine.on('ready', function () {
//         let stream; // we will use only one file :)
//         let body;
//         let data = {};
//         let file = engine.files[0];
//         data.positions = range.replace(/bytes=/, "").split("-");
//         data.start = parseInt(data.positions[0], 10);
//         data.total = file.length;
//         data.end = data.positions[1] ? parseInt(data.positions[1], 10) : data.total - 1;
//         data.chunksize = (data.end - data.start) + 1;
//         stream = file.createReadStream({
//             start: data.start,
//             end: data.end
//         });
//         // engine.files.forEach(function (file) {
//         //     console.log('filename:', file.name);
//         //     stream = file.createReadStream();
//         //     // stream is readable stream to containing the file content
//         // });
//         callback(stream, data);
//     });
// }