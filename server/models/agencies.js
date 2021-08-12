module.exports = function agencies(sequelize, DataTypes) {
  return sequelize.define('agencies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    agency_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'agencies',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ],
      },
    ],
  });
};
