const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = { catchErrors };
