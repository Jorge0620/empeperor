const app = require('./app');

let server;
let port = 3002;
server = app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
