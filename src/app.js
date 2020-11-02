const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { errorHandler } = require('./resources/middlewear/error-handler');
const { logger, logInfo } = require('./resources/middlewear/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', error => {
  logger.log('error', `captured error: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  logger.log('error', `Unhandled rejection detected: ${reason.message}`);
});

app.use('/users', userRouter);
app.use('/boards', [boardRouter, taskRouter]);
app.use(logInfo);
app.use(errorHandler);

module.exports = app;
