const ErrorWithStatus = require('./helpers/errorWithStatus');
const mongoose = require('mongoose');

const handleStatusError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: statusCode,
    error: message,
  });
};

const internalError = (err, res) => {
  res.statusCode = 500;
  res.send(err.message);

  console.debug('INTERNAL ERROR:', err.message);
};

module.exports = (error, _req, res, _next) => {
  if (error instanceof ErrorWithStatus) {
    return handleStatusError(error, res);
  }
  if (error instanceof mongoose.Error.ValidationError) {
    const firstErr = Object.keys(error.errors)[0];
    const { message } = error.errors[firstErr];

    return handleStatusError({ message, statusCode: 422 }, res);
  }
  return internalError(error, res);
};
