const { isJwtExpired } = require('jwt-check-expiration');

exports.verifytoken = (req, res, next) => {
  const token = req.header('authorization').split(' ')[1];
  const expired = isJwtExpired(token);
  console.log(expired);
  if (expired) {
    res.status(403).json({
      error: 'token expired',
    });
  } else {
    next();
  }
};
