// const Joi = require('joi');
const Joi = require('joi')
  .extend(require('@joi/date'));
const sequelize = require('sequelize');
const dateFormat = require('dateformat');
const models = require('../models');

exports.saveMateriel = (req, res) => {
  const current = new Date();
  const materiel = {
    iddesignation: req.body.iddesignation,
    numeroinventaire: req.body.numeroinventaire.trim(),
    garentie: req.body.garentie,
    datereceptionprovisoire: req.body.datereceptionprovisoire,
    IDFournisseur: req.body.IDFournisseur,
    datesaisie: dateFormat(current, 'yyyy-mm-dd'),
    idtype: req.body.idtype,

  };
  models.materiel
    .findOne({ where: { numeroinventaire: req.body.numeroinventaire.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'materiel existe deja !' });
      } else {
        const schema = Joi.object({
          idservice: Joi.number(),
          garentie: Joi.string(),
          numeroinventaire: Joi.optional().allow(''),
          iddesignation: Joi.string().required(),
          datereceptionprovisoire: Joi.date().required().format('YYYY-MM-DD').utc(),
          IDFournisseur: Joi.number().required(),
          idtype: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({
            error: error.details[0].message,
          });
        }
        models.materiel.create(materiel).then((result1) => {
          res.status(201).json({ message: 'Le materiel a été crée avec succés', service: result1 });
        })
          .catch((error1) => {
            console.log(error1);
            res.status(500).json({ message: 'Something went wrong', error });
          });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Something went wrong',

      });
    });
};
exports.updateMateriel = (req, res) => {
  models.materiel.update(req.body, { where: { idmateriel: req.body.idmateriel } })
    .then((result) => {
      res.status(201)
        .json({ message: 'le materiel a été modifié avec succés ', materiel: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};

exports.getallmateriels = (req, res) => {
  models.agents.hasMany(models.materiel, { foreignKey: 'mleagent', sourceKey: 'agent_number' });
  models.materiel.belongsTo(models.agents, { foreignKey: 'mleagent', sourceKey: 'agent_number' });

  models.agencies.hasMany(models.materiel, { foreignKey: 'idagence', sourceKey: 'id' });
  models.materiel.belongsTo(models.agencies, { foreignKey: 'idagence', sourceKey: 'id' });

  models.typemateriel.hasMany(models.materiel, { foreignKey: 'idtype', sourceKey: 'id' });
  models.materiel.belongsTo(models.typemateriel, { foreignKey: 'idtype', sourceKey: 'idtype' });

  models.services.hasMany(models.materiel, { foreignKey: 'idservice', sourceKey: 'id' });
  models.materiel.belongsTo(models.services, { foreignKey: 'idservice', sourceKey: 'idservice' });

  models.fournisseur.hasMany(models.materiel, { foreignKey: 'IDFournisseur', sourceKey: 'idFournisseur' });
  models.materiel.belongsTo(models.fournisseur, { foreignKey: 'IDFournisseur', sourceKey: 'idFournisseur' });

  models.designation.hasMany(models.materiel, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });
  models.materiel.belongsTo(models.designation, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });

  models.materiel.findAll({
    attributes: ['idmateriel', 'iddesignation', 'numeroinventaire', 'garentie', 'datereceptionprovisoire', 'Affecter', 'idtype', 'IDFournisseur', 'idagence', 'mleagent', 'idservice'],
    include: [
      { model: models.services, attributes: ['service_name'] },
      { model: models.agencies, attributes: ['agency_name'] },
      { model: models.agents, attributes: ['agent_full_name'] },
      { model: models.typemateriel, attributes: ['type'] },
      { model: models.fournisseur, attributes: ['NomFournisseur'] },
      { model: models.designation, attributes: ['designation'] },
    ],
  })
    .then((materiels) => res.status(200).json(materiels))
    .catch((error) => res.status(500).json(error));
};

exports.deletemateriel = (req, res) => {
  models.materiel.destroy({ where: { idmateriel: req.body.idmateriel } })
    .then((result) => {
      res.status(201)
        .json({ message: 'le materiel a été supprimé avec succés ', materiel: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};

exports.AffecterMaterielle = (req, res) => {
  const materielaffct = {
    idagence: req.body.idagence,
    mleagent: req.body.mleagent,
    idservice: req.body.idservice,
    Affecter: true,
  };
  models.materiel.update(materielaffct, { where: { idmateriel: req.body.idmateriel } })
    .then((result) => {
      res.status(201)
        .json({ message: 'le materiel a été affecté avec succés ', materiel: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};
//   select count(*),typemateriel.type
//   from materiel
//   join designation on designation.idDesignation=materiel.iddesignation
//   join typemateriel on typemateriel.id=materiel.idtype
//   group by materiel.idtype
exports.GetTotalbyType = (req, res) => {
  models.typemateriel.hasMany(models.materiel, { foreignKey: 'idtype', sourceKey: 'id' });
  models.materiel.belongsTo(models.typemateriel, { foreignKey: 'idtype', sourceKey: 'idtype' });

  models.designation.hasMany(models.materiel, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });
  models.materiel.belongsTo(models.designation, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });

  models.materiel.findAll({
    attributes: [[sequelize.fn('count', sequelize.col('materiel.idtype')), 'nbrMaterielbyType']],

    include: [
      { model: models.typemateriel, attributes: ['type'] },
      // {model:models.designation,attributes:['designation']}
    ],
    group: ['materiel.idtype'],
    raw: true,
  })
    .then((materiels) => res.status(200).json(materiels))
    .catch((error) => res.status(500).json(error));
};

exports.GetAvailableMaterielTotal = (req, res) => {
  models.typemateriel.hasMany(models.materiel, { foreignKey: 'idtype', sourceKey: 'id' });
  models.materiel.belongsTo(models.typemateriel, { foreignKey: 'idtype', sourceKey: 'idtype' });

  models.designation.hasMany(models.materiel, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });
  models.materiel.belongsTo(models.designation, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });

  models.materiel.findAll({
    attributes: [[sequelize.fn('count', sequelize.col('materiel.idtype')), 'nbrMaterielbyType']],
    where: { Affecter: false },
    include: [
      { model: models.typemateriel, attributes: ['type'] },
      // {model:models.designation,attributes:['designation']}
    ],
    group: ['materiel.idtype'],
    raw: true,
  })
    .then((materiels) => res.status(200).json(materiels))
    .catch((error) => res.status(500).json(error));
};
