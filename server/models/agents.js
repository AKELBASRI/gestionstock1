const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agents', {
    creation_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    agent_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    agent_full_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    agent_email: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    agent_phone: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    agent_mobile: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 13,
      references: {
        model: 'agencies',
        key: 'id'
      }
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 28,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    password_changed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    info_filled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    agent_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'agents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "agent_number" },
        ]
      },
      {
        name: "agent_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "agent_number" },
        ]
      },
      {
        name: "agents_agent_agency",
        using: "BTREE",
        fields: [
          { name: "agency_id" },
        ]
      },
      {
        name: "agents_agent_service",
        using: "BTREE",
        fields: [
          { name: "service_id" },
        ]
      },
    ]
  });
};
