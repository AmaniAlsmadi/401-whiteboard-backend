'use strict';

require('dotenv').config();

const server = require('./server.js');
const { db } = require('./models/index.js');

db.sync().then(() => {
server.start(process.env.PORT || 3000);
}).catch((e) => console.error(e));