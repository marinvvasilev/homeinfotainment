const ImapClass = require('imap');
const config = require('./conf/default');

const IMAP = module.exports = function (next) {
    this.imap = new ImapClass(config.imap);
}

/** 
 * Connect to the IMAP server
 */
IMAP.prototype.connect = function (next) {
    this.imap.once('ready', () => {
        this.canContinue = true;
        next();
    });
    this.imap.once('error', (err) => {
        throw new Error(err);
    });

    this.imap.connect();

};

/**
 * Returns all mailboxes for selected account
 */
IMAP.prototype.getBoxes = function (callback) {
    if (!this.canContinue) {
        throw new Error('You need to call the connect method first!');
    }
    this.imap.getBoxes((err, results) => {
        if (err) {
            throw new Error(err);
        }
        callback(results);
    });
}

/**
 * Get INBOX items
 */
IMAP.prototype.getInbox = function (callback) {
    if (!this.canContinue) {
        throw new Error('You need to call the connect method first!');
    }
    this.fetchMessagesForBox('INBOX', callback);
}

/**
 * Get Calander items
 */
IMAP.prototype.getCalendarEvents = function (callback) {
    if (!this.canContinue) {
        throw new Error('You need to call the connect method first!');
    }
    // this.fetchMessagesForBox('Calendar', (messages) => {
        // var muids = [];
        // muids.push('UID');
        // (Object.keys(messages)).map((item) => {
        //     muids.push((messages[item].UID));
        // });
        // this.searchMailBox('Inbox', [['UID', [muids]]], callback);
    // });
    this.fetchMessagesForBox('Calendar', callback);
    
}

/**
 * Get Todo items
 */
IMAP.prototype.getTodoItems = function (callback) {
    if (!this.canContinue) {
        throw new Error('You need to call the connect method first!');
    }
    this.fetchMessagesForBox('::: TODO :::', callback);
}

/**
 * Get Remember items
 */
IMAP.prototype.getRememberItems = function (callback) {
    if (!this.canContinue) {
        throw new Error('You need to call the connect method first!');
    }
    this.fetchMessagesForBox('::: REMEMBER :::', callback);
}

/**
 * Destroys connection to the server
 */
IMAP.prototype.disconnect = function (callback) {
    if (!this.canContinue) {
        throw new Error('You need to call the connect method first!');
    }
    this.imap.end(() => {
        callback();
    });
}


IMAP.prototype.fetchMessagesForBox = function (boxName, callback) {
    this.imap.openBox(boxName, true, (err, box) => {
        if (err) {
            throw new Error(err)
        };
        const msgCount = box.messages.total;
        let messages = {};
        let f = this.imap.seq.fetch(msgCount + ':' + (msgCount - 10), {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true
        });
        f.on('message', function (msg, seqno) {
            messages[seqno] = {};
            msg.on('body', function (stream, info) {
                let buffer = '';
                stream.on('data', function (chunk) {
                    buffer += chunk.toString('utf8');
                });
                stream.once('end', function () {
                    messages[seqno] = _toObject(ImapClass.parseHeader(buffer));
                });
            });

            // Call this, if message attributes are required
            // Like -> date: 2017-04-18T18:30:08.000Z, flags: [ '\\Seen', '\\Recent' ], uid: 61523
            //
            //
            msg.once('attributes', function (attrs) {
                // console.log('ATTR', attrs);
                messages[seqno].UID = attrs.uid;
            });

            msg.once('end', function () {
                //void
            });
        });
        f.once('error', function (err) {
            throw new Error(err);
        });
        f.once('end', function () {
            console.log('Done fetching all messages!');
            callback(messages);
        });
    });
};

IMAP.prototype.searchMailBox = function (boxName, criteria, callback) {
    this.imap.openBox(boxName, true, (err, box) => {
        if (err) {
            throw new Error(err)
        };
        console.log('Criteria>>>', criteria);
        this.imap.search(criteria, function (err, results) {
            if (err) {
                throw new Error(err);
            }
            const msgCount = box.messages.total;
            let messages = {};
            let f = this.imap.fetch(results, { bodies: '' });
            f.on('message', function (msg, seqno) {
                messages[seqno] = {};
                msg.on('body', function (stream, info) {
                    let buffer = '';
                    stream.on('data', function (chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function () {
                        messages[seqno] = _toObject(ImapClass.parseHeader(buffer));
                    });
                });

                // Call this, if message attributes are required
                // Like -> date: 2017-04-18T18:30:08.000Z, flags: [ '\\Seen', '\\Recent' ], uid: 61523
                //
                //
                msg.once('attributes', function (attrs) {
                    // console.log('ATTR', attrs);
                });

                msg.once('end', function () {
                    //void
                });
            });
            f.once('error', function (err) {
                throw new Error(err);
            });
            f.once('end', function () {
                // console.log('Done fetching all messages!');
                callback(messages);
            });
        }.bind(this));
    });
}

/**
 * 
 * @param {mixed} data - "cast" to Object 
 */
function _toObject(data) {
    return (typeof data === "object") ? data : JSON.parse(data);
}