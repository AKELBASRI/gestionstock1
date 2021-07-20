const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('materiel', {
    idmateriel: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marque: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    numeroinventaire: {
      type: DataTypes.STRING(90),
      allowNull: true
    },
    garentie: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    datereceptionprovisoire: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IDFournisseur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fournisseur',
        key: 'idFournisseur'
      }
    },
    Affecter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    datesaisie: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idtype: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'typemateriel',
        key: 'id'
      }
    },
    idagence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agencies',
        key: 'id'
      }
    },
    idservice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    mleagent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agents',
        key: 'agent_number'
      }
    }
  }, {
    sequelize,
    tableName: 'materiel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idmateriel" },
        ]
      },
      {
        name: "fk_idservice_idx",
        using: "BTREE",
        fields: [
          { name: "idservice" },
        ]
      },
      {
        name: "fk_agenceid_idx",
        using: "BTREE",
        fields: [
          { name: "idagence" },
        ]
      },
      {
        name: "fk_typeid_idx",
        using: "BTREE",
        fields: [
          { name: "idtype" },
        ]
      },
      {
        name: "fk_agentid_idx",
        using: "BTREE",
        fields: [
          { name: "mleagent" },
        ]
      },
      {
        name: "fk_idfournisseur_idx",
        using: "BTREE",
        fields: [
          { name: "IDFournisseur" },
        ]
      },
    ]
  });
};
