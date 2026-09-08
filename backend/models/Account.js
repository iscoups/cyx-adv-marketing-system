const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Account = sequelize.define(
  'Account',
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
    platform: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    accountNo: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
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
    balance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    budget: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    tableName: 'accounts'
  }
);

module.exports = Account;
