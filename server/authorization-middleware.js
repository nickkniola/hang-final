const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    throw new ClientError(401, 'Authentication Required');
  }
  req.user = jwt.verify(token, process.env.TOKEN_SECRET);
  next();
}

module.exports = authorizationMiddleware;
