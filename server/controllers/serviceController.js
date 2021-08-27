const Joi = require('joi');
const models = require('../models');

exports.saveService = (req, res) => {
  const service = {

    service_name: req.body.service_name.trim(),

  };
  models.services
    .findOne({ where: { service_name: req.body.service_name.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'Service existe deja !' });
        return false;
      }
      const schema = Joi.object({
        service_name: Joi.string().trim().required(),

      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      models.services.create(service).then((result1) => {
        res.status(201).json({ message: 'Le service a été crée avec succés', service: result1 });
      })
        .catch((error1) => {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong', error1 });
        });
      return true;
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong',

      });
    });
};
exports.getAllServices = (req, res) => {
  models.services.findAll()
    .then((services) => res.status(200).json(services))
    .catch((error) => res.status(500).json(error));
};
exports.deleteservice = (req, res) => {
  models.services.destroy({ where: { id: req.body.id } })
    .then((result) => {
      res.status(201)
        .json({ message: 'le service a été supprimé avec succés ', service: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};

exports.updateService = (req, res) => {
  models.services
    .findOne({ where: { service_name: req.body.service_name.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'Service existe deja !' });
        return false;
      }
      return models.services.update(req.body, { where: { id: req.body.id } })
        .then((result1) => {
          res.status(201)
            .json({ message: 'le service a été modifié avec succés ', user: result1 });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: `Something went wrong${error}` });
        });
    });
};
