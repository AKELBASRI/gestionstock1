// const Joi = require('joi');
// const Joi = require('joi')
// .extend(require('@joi/date'));
const sequelize = require('sequelize');
const dateFormat = require('dateformat');
// const models = require('../models');
const xlsx = require('node-xlsx');
const db = require('../models');
const initModels = require('../models/init-models');
const materialFields = require('../utils/MaterielFields');

// const env = process.env.NODE_ENV || 'development';
// const config = require(`${__dirname}/../config/config.json`)[env];
const models = initModels(db.sequelize);
exports.saveMateriel = (req, res) => {
  const current = new Date();
  const materiel = {
    iddesignation: req.body.iddesignation,
    numeroinventaire: req.body.numeroinventaire.trim(),
    garentie: req.body.garentie,
    datereceptionprovisoire: req.body.datereceptionprovisoire ? dateFormat(req.body.datereceptionprovisoire, 'yyyy-mm-dd') : null,
    IDFournisseur: req.body.IDFournisseur,
    datesaisie: dateFormat(current, 'yyyy-mm-dd'),
    idtype: req.body.idtype,

    Affecter: req.body.Affecter,
    idagence: req.body.idagence,
    mleagent: req.body.mleagent,
    idservice: req.body.idservice,
    idlieu: req.body.idlieu,
  };
  models.materiel
    .findOne({
      where: {
        numeroinventaire: materiel.numeroinventaire.trim()
      || true,
      },
    }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'materiel existe deja !' });
        return false;
      }
      // const schema = Joi.object({
      //   idservice: Joi.number(),
      //   garentie: Joi.string(),
      //   numeroinventaire: Joi.optional().allow(''),
      //   iddesignation: Joi.number().required(),
      //   datereceptionprovisoire: Joi.date().optional().allow(null),
      //   IDFournisseur: Joi.number().optional().required(),
      //   idtype: Joi.number().required(),
      // });
      // const { error } = schema.validate(req.body);
      // if (error) {
      //   return res.status(400).json({
      //     error: error.details[0].message,
      //   });
      // }
      models.materiel.create(materiel).then((result1) => {
        res.status(201).json({ message: 'Le materiel a été crée avec succés', service: result1 });
      })
        .catch((error1) => {
          console.log(error1);
          res.status(500).json({ message: 'Something went wrong', error1 });
        });
      return true;
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        error: 'Something went wrong',

      });
    });
};
exports.updateMateriel = (req, res) => {
  models.materiel
    .findOne({
      where: {
        numeroinventaire: req.body.numeroinventaire.trim()
      || true,
        idtype: req.body.idtype,
        idlieu: req.body.idlieu,
        garentie: req.body.garentie,
        datereceptionprovisoire: req.body.datereceptionprovisoire,
      },
    }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'materiel existe deja !' });
        return false;
      }
      return models.materiel.update(req.body, { where: { idmateriel: req.body.idmateriel } })
        .then((result1) => {
          res.status(201)
            .json({ message: 'le materiel a été modifié avec succés ', materiel: result1 });
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
exports.importmateriel = (req, res) => {
  const obj = xlsx.parse(`${`${__dirname}/../`}\\typedesignationinventaire.xlsx`); // parses a file
  const promises = obj[0].data.map((materiel) => models.designation
    .findOne({ where: { designation: materiel[1] } })
    .then((result1) => [result1, materiel[0]])

    .catch((error1) => {
      res.status(500).json({ message: 'Something went wrong', error1 });
    }));
    // item[0].idDesignation, item[1]
  Promise.all(promises).then((result) => {
    const current = new Date();
    result.map((item) => {
      const materiel1 = {
        iddesignation: item[0].idDesignation,
        numeroinventaire: item[1],

        datesaisie: dateFormat(current, 'yyyy-mm-dd'),
        idtype: item[0].idtype,

      };
      return models.materiel.create(materiel1).then((result1) => {
        res.status(201).json({ message: 'Le materiel a été crée avec succés', service: result1 });
      })
        .catch((error1) => {
          console.log(error1);
          res.status(500).json({ message: 'Something went wrong', error1 });
        });
    });
    res.status(201).json(result);
  });
};
exports.createbackupMateriel = (req, res) => {
  const ladate = new Date();
  const nameofTable = `Materiel_${ladate.getFullYear()}`;

  db.sequelize.queryInterface.createTable(nameofTable,
    materialFields(db.Sequelize.DataTypes))
    .then(() => {
      db.sequelize.query(`insert into ${nameofTable} select * from materiel`, { })
        .then(() => {
          db.sequelize.query('update materiel set disponible=0 where 1=1', { })
            .then((result1) => res.status(201)
              .json({ message: `All materiels are not available and table Materiel_${ladate.getFullYear()} is created successfully`, materiel: result1 }))
            .catch((error) => {
              console.log(error);
              res.status(500).json({ error: `Something went wrong${error}` });
            });
        })
        .catch((error) => res.status(500).json({ error: error.errors[0].message }));
    }).catch((error) => { console.log(error); res.status(500).json({ error: `Something went wrong${error}` }); });
};
exports.getcomparaison = (req, res) => {
  const nameofTable = `Materiel_${req.query.year}`;
  db.sequelize.query(`SELECT 
        materiel.numeroinventaire,
        designation.designation as "designationname",
        materiellieu.lieu as "nouveaulieu",
        agencynew.agency_name as "newagency",
        servicenew.service_name as "newservice" ,
        materielancien.lieu  as "oldPlace",
        agencyancien.agency_name as "oldagency",
        serviceancien.service_name as "oldservice"
        FROM materiel  join ${nameofTable} on
        materiel.idmateriel=${nameofTable}.idmateriel
        join lieu as materiellieu on materiellieu.id=materiel.idlieu 
        join lieu as materielancien on materielancien.id=${nameofTable}.idlieu
        join agencies as agencyancien on agencyancien.id=${nameofTable}.idagence
        join agencies as agencynew on agencynew.id=materiel.idagence
        Join services as servicenew on servicenew.id=materiel.idservice
        join designation on designation.idDesignation=materiel.iddesignation
        join services as serviceancien on serviceancien.id=${nameofTable}.idservice
      where 
        materiel.idlieu<>${nameofTable}.idlieu 
        or materiel.idservice<>${nameofTable}.idservice
        or materiel.idagence<>${nameofTable}.idagence`, { }).then((result1) => {
    res.status(201).json(result1[0]);
  })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong  ${error}` });
    });
};
exports.getyears = (req, res) => {
  db.sequelize.query(`SELECT SUBSTRING_INDEX(table_name,'_',-1) as 'year' FROM information_schema.tables
  WHERE table_schema = 'gestion_stock' and table_name like 'materiel_%'`).then((result1) => {
    res.status(201).json(result1[0]);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({ error: `Something went wrong  ${error}` });
  });
};
exports.getallmateriels = (req, res) => {
  models.materiel.findAll({
    attributes: ['idmateriel', 'iddesignation', 'numeroinventaire', 'garentie', 'datereceptionprovisoire', 'Affecter', 'idtype', 'IDFournisseur', 'idagence', 'mleagent', 'idservice', 'disponible', 'idlieu', 'proposerreforme'],
    include: [
      { model: models.services, attributes: ['service_name'] },
      { model: models.agencies, attributes: ['agency_name'] },
      { model: models.agents, attributes: ['agent_full_name'] },
      { model: models.typemateriel, attributes: ['type'] },
      { model: models.fournisseur, attributes: ['NomFournisseur'] },
      { model: models.designation, attributes: ['designation'] },
      { model: models.lieu, attributes: ['lieu'] },
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
exports.checkiftableexist = (req, res) => {
  const ladate = new Date();
  const nameofTable = `Materiel_${ladate.getFullYear()}`;
  db.sequelize.query(`SHOW TABLES LIKE '${nameofTable}';`)
    .then((result) => res.status(200).json(result[0][0]))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};
exports.AffecterMaterielbynumberofinventory = (req, res) => {
  const materielaffct = {
    idagence: req.body.idagence,
    mleagent: req.body.mleagent,
    idservice: req.body.idservice,
    Affecter: true,
    disponible: req.body.disponible,
    idlieu: req.body.idlieu,
    proposerreforme: req.body.proposerreforme,
  };
  models.materiel
    .findOne({
      where: {
        numeroinventaire: req.body.numeroinventaire.trim(),

      },
    }).then((result) => {
      if (result) {
        models.materiel.update(materielaffct, {
          where:
          { numeroinventaire: req.body.numeroinventaire },
        })
          .then((result1) => res.status(201)
            .json({ message: 'le materiel a été affecté avec succés ', materiel: result1 }))
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error: `Something went wrong${error}` });
          });
        return true;
      }
      res.status(404).json({ error: "le materiel avec ce numero d'inventaire n'existe pas" });
      return false;
    }).catch((error) => {
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
    idlieu: req.body.idlieu,
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
    attributes: [[sequelize.fn('count', sequelize.col('materiel.idtype')), 'nbrMaterielbyType'], 'idtype'],

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
    attributes: [[sequelize.fn('count', sequelize.col('materiel.idtype')), 'nbrMaterielbyType'], 'idtype'],
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
