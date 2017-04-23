const config = require('../config/default.js');
const path = require('path');

class Routes {

    /**
     * Class constructor
     * @param {*} app express.js initialized app
     */
    constructor(express, app) {
        this.app = app;
        this.viewsFolder = path.join(__dirname, '../../', config.server.viewsFolder);
        // Set static folder
        this.app.use(express.static(config.server.staticFolder));
        // Set views folder
        this.app.set('views', this.viewsFolder);
    }


    /**
     * Set socket io, so it could be later used inside routes
     * @param {*} socketIO 
     */
    setSocketIo() {
        this.io = this.app.get('scoketio');
        if (typeof this.io === "undefined") {
            throw new Error('Socket IO is not instantiated');
        }
    }


    /**
     * Registers app routes
     * called from /index.js
     */
    registerRoutes() {
        // Home route
        this.app.get('/', (req, res) => {
            res.sendFile('index.html', { root: this.viewsFolder });
        });
        // Login route
        this.app.get('/login', (req, res) => {
            // set this.io
            const data = "xtan";
            req.app.io.emit('userLogin', data);
            res.sendFile('login.html', { root: this.viewsFolder });
        });
    }

}

module.exports = Routes;