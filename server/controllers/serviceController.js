const Joi = require('joi');
// const sequelize = require('sequelize');
const db = require('../models');
const initModels = require('../models/init-models');
// const models = require('../models');
const models = initModels(db.sequelize);
// var service = require('path/to/user')(sequelize, DataTypes);
// require('sequelize-hierarchy')(Sequelize);

exports.saveService = (req, res) => {
  const service = {

    service_name: req.body.service_name.trim(),
    hierarchyLevel: req.body.hierarchyLevel.trim(),
    parentId: req.body.parentId,
  };
  models.services
    .findOne({ where: { service_name: req.body.service_name.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'Service existe deja !' });
        return false;
      }
      const schema = Joi.object({
        service_name: Joi.string().trim().required(),
        hierarchyLevel: Joi.number().required(),
        parentId: Joi.number().optional(),
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
  models.services.findAll({
    include: [
      {
        model: models.services,
        required: false,
        as: 'parent',
        attributes: ['id', 'service_name'],
      },
    ],
  })
    .then((services) => res.status(200).json(services))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
exports.getAllServiceswithhiearchy = (req, res) => {
  models.services.findAll({ hierarchy: true })
    .then((services) => res.status(200).json(services))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
function searchTree(element, id) {
  if (element.id === id) {
    return element;
  } if (element.children != null) {
    let i;
    let result = null;
    for (i = 0; result == null && i < element.children.length; i += 1) {
      result = searchTree(element.children[i], id);
    }
    return result;
  }
  return null;
}
exports.getOneServiceHiearchy = async (req, res) => {
  try {
    const data = await models.services.findAll({ hierarchy: true });
    if (data !== undefined) {
      const element = data[0];
      const result = searchTree(element, req.body.id);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
exports.getAllParentsOfService = async (req, res) => {
  try {
    const firstobj = await models.services.findOne({
      where: { id: req.body.id },

      raw: true,
    });
    const objectParent = [];
    if (firstobj !== undefined) {
      const functionrecursive = async (parentid) => models.services.findOne({
        where: { id: parentid },

        nested: true,
      });

      const obj = await functionrecursive(firstobj.parentId);
      if (obj !== undefined) {
        objectParent.push(obj);
        firstobj.parents = objectParent;
        console.log(obj.parentId);

        if (obj.parentId !== null) {
          const objsuivant = await functionrecursive(obj.parentId);
          objectParent.push(objsuivant);
          // obj.parents = objectParent;
        }
        res.status(200).json(firstobj);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
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
