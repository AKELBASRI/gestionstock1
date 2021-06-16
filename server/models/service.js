const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service', {
    idservice: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomservice: {
      type: DataTypes.STRING(450),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'service',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idservice" },
        ]
      },
    ]
  });
};
