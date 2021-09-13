const xlsx = require('node-xlsx');
const Joi = require('joi');
const models = require('../models');

exports.getalllieux = (req, res) => {
  models.lieu
    .findAll()
    .then((lieux) => res.status(200).json(lieux))
    .catch((error) => res.status(500).json(error));
};
exports.importlieu = (req, res) => {
  const obj = xlsx.parse(`${`${__dirname}/../`}lieu.xlsx`); // parses a file
  obj[0].data.map((lieu1) => models.lieu.create({ lieu: lieu1[0] }).then((result1) => {
    res.status(201).json({ message: 'Le lieu a été crée avec succés', lieu: result1 });
  })
    .catch((error1) => {
      res.status(500).json({ message: 'Something went wrong', error1 });
    }));
};
exports.savelieu = (req, res) => {
  const lieu = {
    lieu: req.body.lieu.trim(),
    id: req.body.id,
  };
  models.lieu
    .findOne({ where: { lieu: req.body.lieu.trim() } })
    .then((result) => {
      if (result) {
        res.status(403).json({ error: 'lieu existe deja !' });
        return false;
      }
      const schema = Joi.object({
        lieu: Joi.string().trim().required(),

      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      models.lieu
        .create(lieu)
        .then((result1) => {
          res.status(201).json({
            message: 'le lieu été crée avec succés',
            lieu: result1,
          });
        })
        .catch((error1) => {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong', error1 });
        });
      return true;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};

exports.updateLieu = (req, res) => {
  models.lieu
    .findOne({ where: { lieu: req.body.lieu.trim() } })
    .then((result) => {
      if (result) {
        res.status(403).json({ error: 'lieu existe deja !' });
        return false;
      }
      return models.lieu
        .update(req.body, { where: { id: req.body.id } })
        .then((result1) => {
          res.status(201).json({
            message: 'le lieu a été modifié avec succés ',
            lieu: result1,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: `Something went wrong${error}` });
        });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        error: 'Something went wrong',
      });
    });
};
exports.deletelieu = (req, res) => {
  models.lieu
    .destroy({ where: { id: req.body.id } })
    .then((result) => {
      res.status(201).json({
        message: 'le lieu a été supprimé avec succés ',
        category: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};
