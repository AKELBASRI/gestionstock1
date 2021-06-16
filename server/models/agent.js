const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agent', {
    Mle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomagent: {
      type: DataTypes.STRING(305),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'agent',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Mle" },
        ]
      },
    ]
  });
};
