const dotenv = require('dotenv');

const http = require('http');

dotenv.config();
const port = process.env.PORT;
const app = require('./app');

const server = http.createServer(app);

server.listen(port);
// pm2 start ecosystem.config.js
