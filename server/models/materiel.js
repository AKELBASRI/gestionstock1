const materialFields = require('../utils/MaterielFields');

module.exports = function materiel(sequelize, DataTypes) {
  return sequelize.define('materiel', materialFields(DataTypes), {
    sequelize,
    tableName: 'materiel',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idmateriel' },
        ],
      },
      {
        name: 'fk_agenceid_idx',
        using: 'BTREE',
        fields: [
          { name: 'idagence' },
        ],
      },
      {
        name: 'fk_typeid_idx',
        using: 'BTREE',
        fields: [
          { name: 'idtype' },
        ],
      },
      {
        name: 'fk_agentid_idx',
        using: 'BTREE',
        fields: [
          { name: 'mleagent' },
        ],
      },
      {
        name: 'fk_idfournisseur_idx',
        using: 'BTREE',
        fields: [
          { name: 'IDFournisseur' },
        ],
      },
      {
        name: 'iddesignation_FK',
        using: 'BTREE',
        fields: [
          { name: 'iddesignation' },
        ],
      },
      {
        name: 'idlieu_idx',
        using: 'BTREE',
        fields: [
          { name: 'idlieu' },
        ],
      },
    ],
  });
};
