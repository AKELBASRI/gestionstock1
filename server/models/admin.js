module.exports = function admin(sequelize, DataTypes) {
  return sequelize.define('admin', {
    Mle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(405),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(400),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'Mle' },
        ],
      },
    ],
  });
};
