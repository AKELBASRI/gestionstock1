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

  // const getSubCategoriesRecursive = async (parentservices) => {
  //   const parents = await models.services.findAll({
  //     where: {
  //       parentId: parentservices.parentId,
  //     },
  //     raw: true,
  //   });
  //   return parents;
  // };
  // getSubCategoriesRecursive();
  // if (subCategories.length > 0) {
  //   const promises = [];
  //   subCategories.forEach((category) => {
  //     promises.push(getSubCategoriesRecursive(category));
  //   });
  //   category.subCategories = await Promise.all(promises);
  // } else {
  //   category.subCategories = [];
  // }

  // const obj = await models.services.findAll({
  //   where: {
  //     id: 14,
  //   },
  //   include: [
  //     {
  //       model: models.services, as: 'descendents', hierarchy: true,
  //     },
  //   ],
  // });

  // let parent;
  // let idparent;
  // const getRecursionParent = async (obj1) => {
  //   if (obj1 !== undefined) {
  //     idparent = obj1[0].dataValues.parentId;
  //     if (!idparent.services) {
  //       return null;
  //     }
  //   }

  //   // parent = await obj.getParent();
  //   // obj.dataValues.parent = parent;
  //   return getRecursionParent(parent);
  // };

  // await getRecursionParent(obj);
  // res.status(200).json(obj);
  // (async () => {
  //   try {
  //     await models1.services.sync();

  //     await models1.servicesancestor.sync();
  //     // console.log('Tables are created or updated successfully.');
  //   } catch (error) {
  //     console.error('Unable to create tables:', error);
  //   }
  // })();
  // db.sequelize.models.services.isHierarchy();

  // models.services.findAll({ hierarchy: true })
  //   .then((services) => res.status(200).json(services))
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json(error);
  //   });

  // models.services.findOne({
  //   where: { service_name: 'Service Ingénierie' },
  //   include: [{ model: models.services, as: 'ancestors' }],
  //   order: [[{ model: models.services, as: 'ancestors' }, 'hierarchyLevel']],
  // })
  //   .then((services) => res.status(200).json(services))
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json(error);
  //   });
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
