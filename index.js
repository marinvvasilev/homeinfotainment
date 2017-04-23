const express = require('express');
const routes = require('./app/routes');
// In future versions we can check for env, to switch config files etc.
const envName = process.env.NODE_ENV || "development";
const config = require('./app/lib/Configuration.js')();
const app = express();
const http = require('http').Server(app);
const Routes = new routes(express, app);
// Initialize socket.io
const io = require('socket.io')(http);
// register socket io within out app
// this can later be used inside a route like - req.app.io
app.io = io;
// Register app routes
Routes.registerRoutes();


// Make socker io available inside our app
// app.set('scoketio', io);
// On connection
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('username', (username) => {
    console.log(`User ${username} just logged in!`);
  });

  socket.on('userchange', (username) => {
    console.log(`User ${username} just changed their credentials!`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(config.server.port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening @ http://localhost:${config.server.port}`);
  }
});