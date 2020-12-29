function errorMiddleware(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    error: 'an unexpected error occurred'
  });
}

module.exports = errorMiddleware;
