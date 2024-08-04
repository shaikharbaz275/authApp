// models/User.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../utils/mysqlClient');

const User = sequelize.define('User', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    },

    last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    },

    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },

    mobile_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
