const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users', versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.statics.comparePassword = async (password, user) => {
  await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(null, isMatch);
    });
  });
};

userSchema.statics.generateAuthToken = user =>
  jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(14, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) {
        return next(err1);
      }

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
