module.exports = function lieu(sequelize, DataTypes) {
  return sequelize.define('lieu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    lieu: {
      type: DataTypes.STRING(345),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'lieu',
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
