const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('designation', {
    idDesignation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    designation: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idtype: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'typemateriel',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'designation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDesignation" },
        ]
      },
      {
        name: "idtype_idx",
        using: "BTREE",
        fields: [
          { name: "idtype" },
        ]
      },
    ]
  });
};
