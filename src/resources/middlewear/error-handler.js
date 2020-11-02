const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { logger } = require('./logger');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    let status;
    if (err.status) {
      status = err.status;
    } else {
      status = INTERNAL_SERVER_ERROR;
    }
    logger.error(`status: ${status}, message: ${getStatusText(status)}`);
    await res.status(status).json({ message: getStatusText(status) });
  }
  next();
};

module.exports = { errorHandler };
