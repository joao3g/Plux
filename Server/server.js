const http = require('http');

const app = require('./src/app');

const port = process.env.PORT || 3010;

//criando server
const server = http.createServer(app);
server.listen(port);