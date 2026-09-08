const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ad = sequelize.define(
  'Ad',
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
    projectId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    accountId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    channel: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    objective: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    titlePack: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    logicPage: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    landingPage: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    creativeConfig: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '{}'
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'draft'
    },
    budget: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    spend: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    impressions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    clicks: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    conversions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    previewUrl: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    tableName: 'ads'
  }
);

module.exports = Ad;
