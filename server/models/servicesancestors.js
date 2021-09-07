module.exports = function servicesancestors(sequelize, DataTypes) {
  return sequelize.define('servicesancestors', {
    servicesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    ancestorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'services',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'servicesancestors',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'servicesId' },
          { name: 'ancestorId' },
        ],
      },
      {
        name: 'servicesancestors_servicesId_ancestorId_unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'servicesId' },
          { name: 'ancestorId' },
        ],
      },
      {
        name: 'ancestorId',
        using: 'BTREE',
        fields: [
          { name: 'ancestorId' },
        ],
      },
    ],
  });
};
