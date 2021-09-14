const materialFields = (DataTypes) => (
  {
    idmateriel: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    iddesignation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'designation',
        key: 'idDesignation',
      },
    },
    numeroinventaire: {
      type: DataTypes.STRING(90),
      allowNull: true,
    },
    garentie: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    datereceptionprovisoire: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    IDFournisseur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fournisseur',
        key: 'idFournisseur',
      },
    },
    Affecter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    datesaisie: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    idtype: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'typemateriel',
        key: 'id',
      },
    },
    idagence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agencies',
        key: 'id',
      },
    },
    mleagent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agents',
        key: 'agent_number',
      },
    },
    idservice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idlieu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'lieu',
        key: 'id',
      },
    },
    disponible: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    proposerreforme: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
  }
); module.exports = materialFields;
