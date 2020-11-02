const { logger } = require('./resources/middlewear/logger');
const User = require('./resources/users/user.model');

const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connecion error:')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    User.insertMany([
      new User({ name: 'user1', login: 'admin', password: 'admin' }),
      new User({ name: 'user2', login: 'admin', password: 'admin' })
    ]);
    app.listen(PORT, logger.info(`App is running on http://localhost:${PORT}`));
  }
);
