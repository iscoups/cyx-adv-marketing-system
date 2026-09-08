const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asset = sequelize.define(
  'Asset',
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
    type: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'general'
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'ready'
    },
    tag: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: ''
    },
    uploader: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: 'system'
    },
    usageCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: 'assets'
  }
);

module.exports = Asset;
