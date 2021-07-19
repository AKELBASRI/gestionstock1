var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _agencies = require("./agencies");
var _agents = require("./agents");
var _fournisseur = require("./fournisseur");
var _materiel = require("./materiel");
var _services = require("./services");
var _typemateriel = require("./typemateriel");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var agencies = _agencies(sequelize, DataTypes);
  var agents = _agents(sequelize, DataTypes);
  var fournisseur = _fournisseur(sequelize, DataTypes);
  var materiel = _materiel(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var typemateriel = _typemateriel(sequelize, DataTypes);

  agents.belongsTo(agencies, { as: "agency", foreignKey: "agency_id"});
  agencies.hasMany(agents, { as: "agents", foreignKey: "agency_id"});
  materiel.belongsTo(agencies, { as: "idagence_agency", foreignKey: "idagence"});
  agencies.hasMany(materiel, { as: "materiels", foreignKey: "idagence"});
  materiel.belongsTo(agents, { as: "mleagent_agent", foreignKey: "mleagent"});
  agents.hasMany(materiel, { as: "materiels", foreignKey: "mleagent"});
  agents.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(agents, { as: "agents", foreignKey: "service_id"});
  materiel.belongsTo(services, { as: "idservice_service", foreignKey: "idservice"});
  services.hasMany(materiel, { as: "materiels", foreignKey: "idservice"});
  materiel.belongsTo(typemateriel, { as: "idtype_typemateriel", foreignKey: "idtype"});
  typemateriel.hasMany(materiel, { as: "materiels", foreignKey: "idtype"});

  return {
    admin,
    agencies,
    agents,
    fournisseur,
    materiel,
    services,
    typemateriel,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
