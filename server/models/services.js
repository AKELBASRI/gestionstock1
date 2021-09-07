module.exports = function services(sequelize, DataTypes) {
  return sequelize.define('services', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    service_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hierarchyLevel: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'services',
        key: 'id',
      },

    },
    parents: {
      type: DataTypes.VIRTUAL,

    },
  }, {
    sequelize,
    tableName: 'services',
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
      {
        name: 'parentId',
        using: 'BTREE',
        fields: [
          { name: 'parentId' },
        ],
      },
    ],
  });
};
