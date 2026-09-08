const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '管理员'
    },
    role: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: 'operator'
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    tableName: 'users'
  }
);

module.exports = User;
