const winston = require('winston');

const options = {
  fileInfo: {
    level: 'info',
    filename: 'logs/info.log',
    json: false,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    handleExceptions: false
  },
  fileError: {
    level: 'error',
    filename: 'logs/error.log',
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    handleExceptions: true
  }
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError)
  ]
});

module.exports = { winston: logger };
