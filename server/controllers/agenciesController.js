const models = require('../models');

exports.getagencies = (req, res) => {
  models.agencies.findAll()
    .then((agencies) => res.status(200).json(agencies))
    .catch((error) => res.status(500).json(error));
};
