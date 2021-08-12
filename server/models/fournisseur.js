module.exports = function fournisseur(sequelize, DataTypes) {
  return sequelize.define('fournisseur', {
    idFournisseur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    NomFournisseur: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'fournisseur',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'idFournisseur' },
        ],
      },
    ],
  });
};
