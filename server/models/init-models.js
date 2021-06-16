var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _agencies = require("./agencies");
var _agent = require("./agent");
var _materiel = require("./materiel");
var _service = require("./service");
var _typemateriel = require("./typemateriel");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var agencies = _agencies(sequelize, DataTypes);
  var agent = _agent(sequelize, DataTypes);
  var materiel = _materiel(sequelize, DataTypes);
  var service = _service(sequelize, DataTypes);
  var typemateriel = _typemateriel(sequelize, DataTypes);

  materiel.belongsTo(agencies, { as: "idagence_agency", foreignKey: "idagence"});
  agencies.hasMany(materiel, { as: "materiels", foreignKey: "idagence"});
  materiel.belongsTo(agent, { as: "mleagent_agent", foreignKey: "mleagent"});
  agent.hasMany(materiel, { as: "materiels", foreignKey: "mleagent"});
  materiel.belongsTo(service, { as: "idservice_service", foreignKey: "idservice"});
  service.hasMany(materiel, { as: "materiels", foreignKey: "idservice"});

  return {
    admin,
    agencies,
    agent,
    materiel,
    service,
    typemateriel,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
