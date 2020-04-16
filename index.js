const express = require('express');
const inMemoryDatabase = require('./inMemoryDatabase');
const handleErrors = require('./utils/errorHandler');
const consoleLogger = require('./consoleLogger');


function createApp(database, logger) {
  const app = express();
  app.locals.config = { database, logger };

  app.use(express.json());
  app.use(express.static(__dirname));

  app.get('/', (req, res) => {
    res.render('index.html');
  });
  app.use(handleErrors);

  return app;
}

if (require.main === module) {
  const app = createApp(inMemoryDatabase, consoleLogger);

  const port = 3000;
  app.listen(port, () => {
    consoleLogger('Server', process.pid, 'listening on port', port);
  });
} else {
  module.exports = createApp;
}
