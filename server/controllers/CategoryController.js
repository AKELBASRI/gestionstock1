const Joi = require('joi');
const models = require('../models');

exports.saveCategory = (req, res) => {
  const category = {
    type: req.body.type.trim(),
    inventoryornot: req.body.inventoryornot,
  };
  models.typemateriel
    .findOne({ where: { type: req.body.type.trim() } })
    .then((result) => {
      if (result) {
        res.status(403).json({ error: 'Categorie existe deja !' });
        return false;
      }
      const schema = Joi.object({
        type: Joi.string().trim().required(),
        inventoryornot: Joi.boolean().optional(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      models.typemateriel
        .create(category)
        .then((result1) => {
          res.status(201).json({
            message: 'La category a été crée avec succés',
            category: result1,
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
exports.getAllCategories = (req, res) => {
  models.typemateriel
    .findAll()
    .then((categories) => res.status(200).json(categories))
    .catch((error) => res.status(500).json(error));
};
exports.deleteCategory = (req, res) => {
  models.typemateriel
    .destroy({ where: { id: req.body.id } })
    .then((result) => {
      res.status(201).json({
        message: 'la category a été supprimé avec succés ',
        category: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};

exports.updateCategory = (req, res) => {
  models.typemateriel
    .update(req.body, { where: { id: req.body.id } })
    .then((result) => {
      res.status(201).json({
        message: 'la category a été modifié avec succés ',
        category: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};
