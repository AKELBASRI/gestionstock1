const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');

function signUp(req, res) {
  models.admin.findOne({ where: { Mle: req.body.Mle } }).then((result) => {
    if (result) {
      res.status(409).json({ message: 'Matricule existe deja !' });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      // Store hash in your password DB.
      const user = {
        Mle: req.body.Mle,
        password: hash,
        nom: req.body.nom,
      };
      models.admin
        .create(user)
        .then((result2) => {
          res
            .status(201)
            .json({ message: "L'utilisateur est crée avec succés", user: result2 });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong', error });
        });
    }
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',

    });
  });
}
function signIn(req, res) {
  models.admin.findOne({ where: { Mle: req.body.Mle } }).then((user) => {
    if (user === null) {
      res.status(401).json({
        message: 'Invalid credentials !',
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          user.password = undefined;

          jwt.sign({
            Mle: user.Mle,
            user,

          }, process.env.JWT_KEY, (err1, token) => {
            if (err1) {
              res.status(500).json({ message: 'Something wrong' });
            }
            res.cookie('token', token, { expire: new Date() + 8062000 });
            res.status(200).json({
              message: 'Authentication successful !',

              user,
              token,
            });
          });
        } else {
          res.status(401).json({
            error: 'Invalid credentials !',
          });
        }
      });
    }
  }).catch((error) => {
    res.status(500).json({
      message: `Something went wrong !${error}`,
    });
  });
}
const signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'User Signout',
  });
};
module.exports = {
  signUp,
  signIn,
  signout,
};
