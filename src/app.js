const express = require('express');
const morgan = require('morgan');
const { finished } = require('stream');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const { createWriteStream } = require('fs');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { logger, errorHandler } = require('./resources/middleware');

const app = express();

process.on('uncaughtException ', err => {
  // сообщение в папке - logs/error.log
  logger.error(err.message);
});

process.on('unhandledRejection', err => {
  console.log(`\nError: ${err.message}\n`);
});

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// console
app.use(morgan('dev'));

// file
app.use(morgan('combined', { stream: createWriteStream('./logs/access.log') }));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  const { method, url, body, params } = req;
  // сообщение в папке - logs/info.log
  logger.info({ method, url, body, params });

  next();

  return finished(res, () => {
    const { statusCode } = res;
    const bodyToString = JSON.stringify(body);
    const queryToString = JSON.stringify(params);
    // console
    console.log(
      `
      method: ${method},
      url: ${url},
      body: ${bodyToString},
      query parameters=${queryToString},
      statusCode: ${statusCode}
      `
    );
  });
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use(
  '/:id/tasks',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

app.use(errorHandler);

module.exports = app;
