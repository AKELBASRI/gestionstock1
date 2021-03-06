const Joi = require('joi');
const xlsx = require('node-xlsx');
// const db = require('../models');
const models = require('../models');

exports.saveDesignation = (req, res) => {
  const designation = {

    designation: req.body.designation.trim(),
    idtype: req.body.idtype,
  };
  models.designation
    .findOne({ where: { designation: req.body.designation.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'designation existe deja !' });
        return false;
      }
      const schema = Joi.object({
        designation: Joi.string().trim().required(),
        idtype: Joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      models.designation.create(designation).then((result1) => {
        res.status(201).json({ message: 'La designation a été crée avec succés', designation: result1 });
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
let idresult;
const getTypeNumberOfCategory = (value) => {
  switch (value) {
    case 'IM':
      idresult = 5;
      break;

    case 'MO':
      idresult = 3;
      break;
    case 'LC':
      idresult = 25;
      break;
    case 'TS':
      idresult = 26;
      break;

    case 'MR':
      idresult = 28;
      break;
    case 'AR':
      idresult = 29;
      break;
    case 'AD':
      idresult = 32;
      break;
    case 'DD':
      idresult = 31;
      break;

    case 'GO':
      idresult = 33;
      break;
    case 'GR':
      idresult = 34;
      break;
    case 'HB':
      idresult = 37;
      break;
    case 'UTM':
      idresult = 35;
      break;
    case 'SW':
      idresult = 39;
      break;

    case 'ON':
      idresult = 42;
      break;
    case 'SR':
      idresult = 41;
      break;
    case 'SC':
      idresult = 43;
      break;
    case 'UT':
      idresult = 44;
      break;
    case 'RB':
      idresult = 45;
      break;
    case 'PH':
      idresult = 46;
      break;
    case 'CH':
      idresult = 47;
      break;
    case 'SS':
      idresult = 48;
      break;
    default:
      idresult = null;
      break;
  }
  return idresult;
};

exports.importDesignation = (req, res) => {
  const obj = xlsx.parse(`${`${__dirname}/../`}\\typedesignationinventaire.xlsx`); // parses a file
  obj[0].data.map((designation) => {
    designation[0] = designation[0].substring(4, 6);
    designation[2] = getTypeNumberOfCategory(designation[0]);
    // if (getTypeNumberOfCategory(designation[0]) !== null) {
    const designationi = {
      designation: designation[1],
      idtype: designation[2],
    };
    models.designation.create(designationi).then((result1) => {
      res.status(201).json({ message: 'La designation a été crée avec succés', designation: result1 });
    })
      .catch((error1) => {
        res.status(500).json({ message: 'Something went wrong', error1 });
      });
    // }
    return true;
  });

  // let obj = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`)); // parses a buffer
};
exports.getAllDesignation = (req, res) => {
  models.typemateriel.hasMany(models.designation, { foreignKey: 'idtype', sourceKey: 'id' });
  models.designation.belongsTo(models.typemateriel, { foreignKey: 'idtype', sourceKey: 'id' });
  models.designation.findAll({
    include: [

      { model: models.typemateriel, attributes: ['type'] },

    ],
  })
    .then((designations) => res.status(200).json(designations))
    .catch((error) => res.status(500).json(error));
};

exports.deleteDesignation = (req, res) => {
  models.designation.destroy({ where: { idDesignation: req.body.idDesignation } })
    .then((result) => {
      res.status(201)
        .json({ message: 'la designation a été supprimé avec succés ', designation: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `Something went wrong${error}` });
    });
};

exports.updateDesignation = (req, res) => {
  models.designation
    .findOne({ where: { designation: req.body.designation.trim() } }).then((result) => {
      if (result) {
        res.status(403).json({ error: 'designation existe deja !' });
        return false;
      }
      return models.designation.update(req.body,
        { where: { idDesignation: req.body.idDesignation } })
        .then((result1) => {
          res.status(201)
            .json({ message: 'la designation a été modifié avec succés ', designation: result1 });
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

exports.DesignationById = (req, res, next, idtype) => {
  models.designation.findAll({ where: { idtype } })
    .then(
      (designation) => {
        req.designation = designation;
        next();
      },
      // designations=>
      // req.designation=designations
    )
    .catch((error) => res.status(500).json(error));
};
exports.showDesignation = (req, res) => {
  res.status(201).json({ designation: req.designation });
};
