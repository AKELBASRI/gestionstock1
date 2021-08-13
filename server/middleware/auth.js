const expressJWT = require('express-jwt');

exports.requireSignIn = expressJWT({
  // secret: process.env.JWT_KEY,
  secret: 'secret',
  algorithms: ['HS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  // if (req.auth.role == 1) {
  //   return next();
  // }
  const user = req.profile && req.auth && req.profile.Mle === req.auth.Mle;
  if (!user) {
    return res.status(403).json({
      error: 'Access Denied',
    });
  }

  return next();
};
