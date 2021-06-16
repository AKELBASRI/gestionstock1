const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agencies', {
    idagencies: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomagence: {
      type: DataTypes.STRING(405),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'agencies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idagencies" },
        ]
      },
    ]
  });
};
