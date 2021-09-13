const { DataTypes } = require('sequelize');
const _admin = require('./admin');
const _agencies = require('./agencies');
const _agents = require('./agents');
const _designation = require('./designation');
const _fournisseur = require('./fournisseur');
const _materiel = require('./materiel');
const _services = require('./services');
const _typemateriel = require('./typemateriel');
const _lieu = require('./lieu');

function initModels(sequelize) {
  const admin = _admin(sequelize, DataTypes);
  const agencies = _agencies(sequelize, DataTypes);
  const agents = _agents(sequelize, DataTypes);
  const designation = _designation(sequelize, DataTypes);
  const fournisseur = _fournisseur(sequelize, DataTypes);
  const materiel = _materiel(sequelize, DataTypes);
  const services = _services(sequelize, DataTypes);
  const typemateriel = _typemateriel(sequelize, DataTypes);
  const lieu = _lieu(sequelize, DataTypes);
  // agents.belongsTo(agencies, { as: 'agency', foreignKey: 'agency_id' });
  // agencies.hasMany(agents, { as: 'agents', foreignKey: 'agency_id' });
  // materiel.belongsTo(agencies, { as: 'idagence_agency', foreignKey: 'idagence' });
  // agencies.hasMany(materiel, { as: 'materiels', foreignKey: 'idagence' });
  // materiel.belongsTo(agents, { as: 'mleagent_agent', foreignKey: 'mleagent' });
  // agents.hasMany(materiel, { as: 'materiels', foreignKey: 'mleagent' });
  // materiel.belongsTo(designation,
  // { as: 'iddesignation_designation', foreignKey: 'iddesignation' });
  // designation.hasMany(materiel, { as: 'materiels', foreignKey: 'iddesignation' });
  // materiel.belongsTo(fournisseur,
  // { as: 'IDFournisseur_fournisseur', foreignKey: 'IDFournisseur' });
  // fournisseur.hasMany(materiel, { as: 'materiels', foreignKey: 'IDFournisseur' });
  // agents.belongsTo(services, { as: 'service', foreignKey: 'service_id' });
  // services.hasMany(agents, { as: 'agents', foreignKey: 'service_id' });
  // materiel.belongsTo(services, { as: 'idservice_service', foreignKey: 'idservice' });
  // services.hasMany(materiel, { as: 'materiels', foreignKey: 'idservice' });
  // designation.belongsTo(typemateriel, { as: 'idtype_typemateriel', foreignKey: 'idtype' });
  // typemateriel.hasMany(designation, { as: 'designations', foreignKey: 'idtype' });
  // materiel.belongsTo(typemateriel, { as: 'idtype_typemateriel', foreignKey: 'idtype' });
  // typemateriel.hasMany(materiel, { as: 'materiels', foreignKey: 'idtype' });

  agents.hasMany(materiel, { foreignKey: 'mleagent', sourceKey: 'agent_number' });
  materiel.belongsTo(agents, { foreignKey: 'mleagent', sourceKey: 'agent_number' });

  agencies.hasMany(materiel, { foreignKey: 'idagence', sourceKey: 'id' });
  materiel.belongsTo(agencies, { foreignKey: 'idagence', sourceKey: 'id' });

  typemateriel.hasMany(materiel, { foreignKey: 'idtype', sourceKey: 'id' });
  materiel.belongsTo(typemateriel, { foreignKey: 'idtype', sourceKey: 'idtype' });

  services.hasMany(materiel, { foreignKey: 'idservice', sourceKey: 'id' });
  materiel.belongsTo(services, { foreignKey: 'idservice', sourceKey: 'idservice' });

  fournisseur.hasMany(materiel, { foreignKey: 'IDFournisseur', sourceKey: 'idFournisseur' });
  materiel.belongsTo(fournisseur, { foreignKey: 'IDFournisseur', sourceKey: 'idFournisseur' });

  designation.hasMany(materiel, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });
  materiel.belongsTo(designation, { foreignKey: 'iddesignation', sourceKey: 'idDesignation' });

  materiel.belongsTo(lieu, { foreignKey: 'idlieu', sourceKey: 'id' });
  lieu.hasMany(materiel, { foreignKey: 'idlieu', sourceKey: 'id' });
  services.isHierarchy();
  // services.belongsTo(services, {
  //   as: 'parent',
  //   foreignKey: 'parentId',
  //   targetKey: 'id',
  // });

  // // relate parent to child categories
  // services.hasMany(services, {
  //   as: 'childrens',
  //   foreignKey: 'parentId',
  // });
  // (async () => {
  //   try {
  //     await services.sync();

  //     await sequelize.servicesancestor.sync();
  //     // console.log('Tables are created or updated successfully.');
  //   } catch (error) {
  //     console.error('Unable to create tables:', error);
  //   }
  // })();
  return {
    admin,
    agencies,
    agents,
    designation,
    fournisseur,
    materiel,
    services,
    typemateriel,
    lieu,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
