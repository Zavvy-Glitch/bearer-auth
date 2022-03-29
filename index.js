'use strict';

const  server  = require('./src/server.js')
// Start up DB Server
const { db } = require('./src/auth/models/index.js');

const PORT = process.env.PORT || 3000;
db.sync()
  .then(() => {

    // Start the web server
    server.start(PORT);
  });

