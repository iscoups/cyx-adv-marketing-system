const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define(
  'Project',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    clientName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'system'
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'active'
    },
    budget: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    tableName: 'projects'
  }
);

module.exports = Project;
