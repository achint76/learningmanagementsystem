const {DataTypes} = require('sequelize');
const sequelize = require('../db/config');
const models = require('./index');
const studentsessiondetails = sequelize.define('studentsessiondetails', {
    id: {
        type: DataTypes.INTEGER
    }
})