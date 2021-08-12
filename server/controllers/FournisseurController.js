const Joi = require('joi');
const models = require('../models');

exports.saveFournisseur = (req, res) => {
  const fournisseur = {

    NomFournisseur: req.body.NomFournisseur.trim(),

  };
  models.fournisseur
    .findOne({ where: { NomFournisseur: req.body.NomFournisseur.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'Service existe deja !' });
      } else {
        const schema = Joi.object({
          NomFournisseur: Joi.string().trim().required(),

        });
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({
            error: error.details[0].message,
          });
        }
        models.fournisseur.create(fournisseur).then((result) => {
          res.status(201).json({ message: 'Le fournisseur a été crée avec succés', service: result });
        })
          .catch((error1) => {
            console.log(error);
            res.status(500).json({ message: 'Something went wrong', error1 });
          });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong',

      });
    });
};
exports.getAllFournisseurs = (req, res) => {
  models.fournisseur.findAll()
    .then((fournisseurs) => res.status(200).json(fournisseurs))
    .catch((error) => res.status(500).json(error));
};
exports.deleteFournisseur = (req, res) => {
  models.fournisseur.destroy({ where: { idFournisseur: req.body.idFournisseur } })
    .then((result) => {
      res.status(201)
        .json({ message: 'le fournisseur a été supprimé avec succés ', service: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};

exports.updateFournisseur = (req, res) => {
  models.fournisseur.update(req.body, { where: { idFournisseur: req.body.idFournisseur } })
    .then((result) => {
      res.status(201)
        .json({ message: 'le Fournisseur a été modifié avec succés ', user: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};
