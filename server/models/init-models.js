var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _agencies = require("./agencies");
var _agents = require("./agents");
var _materiel = require("./materiel");
var _services = require("./services");
var _typemateriel = require("./typemateriel");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var agencies = _agencies(sequelize, DataTypes);
  var agents = _agents(sequelize, DataTypes);
  var materiel = _materiel(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var typemateriel = _typemateriel(sequelize, DataTypes);

  agents.belongsTo(agencies, { as: "agency", foreignKey: "agency_id"});
  agencies.hasMany(agents, { as: "agents", foreignKey: "agency_id"});
  agents.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(agents, { as: "agents", foreignKey: "service_id"});
  materiel.belongsTo(services, { as: "idservice_service", foreignKey: "idservice"});
  services.hasMany(materiel, { as: "materiels", foreignKey: "idservice"});

  return {
    admin,
    agencies,
    agents,
    materiel,
    services,
    typemateriel,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
